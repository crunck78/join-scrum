import {
  Component, EventEmitter, Input, OnChanges, Output, SimpleChanges
} from '@angular/core';
import {
  FormControl, FormControlStatus, FormGroup, Validators
} from '@angular/forms';
import {
  Observable, Subject, map
} from 'rxjs';
import {
  AddTaskModule, Priority, PriorityType, TaskMode
} from './add-task.module';
import { AddTaskService } from './add-task.service';
import { CategoryResponse } from 'src/app/shared/models/category.model';
import { ContactResponse } from 'src/app/shared/models/contact.model';
import { SubtaskRequest, SubtaskResponse } from 'src/app/shared/models/subtask.model';
import { TaskResponse, TaskRequest, Task } from 'src/app/shared/models/task.model';
import { AddCategoryComponent } from 'src/app/shared/shared-components/dialogs/add-category/add-category.component';
import { AddContactComponent } from 'src/app/shared/shared-components/dialogs/add-contact/add-contact.component';
import { FeedbackService } from 'src/app/shared/shared-services/feedback/feedback.service';
import { MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  standalone: true,
  imports: [
    AddTaskModule
  ],
  providers: [AddTaskService]
})
export class AddTaskComponent implements OnChanges {

  readonly InitTask = {
    title: '',
    description: '',
    category: null,
    assignees: <number[]>[],
    dueDate: null,
    priority: null,
    subtasks: <SubtaskRequest[]>[]
  };

  @Input() showPageTitle = true;
  @Input() task!: TaskResponse;
  @Input() mode: TaskMode = 'add';
  @Input() hideFooter: boolean = false;

  categories$!: Observable<CategoryResponse[]>;
  contacts$!: Observable<ContactResponse[]>;
  subtasks$!: Observable<SubtaskResponse[]>
  @Input() clearTaskForm$!: EventEmitter<void>;
  @Input() submitTaskForm$!: EventEmitter<void>;
  @Input() deleteTask$!: EventEmitter<void>;
  @Input() predefinedTaskRequest!: Partial<TaskRequest>;

  @Output() formStatus$ = new EventEmitter<FormControlStatus>();
  @Output() editedTask = new EventEmitter<TaskResponse | null>();
  @Output() deletedTask = new EventEmitter<number | null>();

  changingSubtaskTitle$: Subject<boolean> = new Subject();


  constructor(private addTaskService: AddTaskService, private feedback: FeedbackService) {
    this.updateCategories();
    this.updateContacts();
    this.updateSubtasks();
    this.addTaskForm.statusChanges.subscribe((status: FormControlStatus) => this.formStatus$.emit(status));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && !!this.task) {
      const taskRepresentation = Task.convertToRepresentation(this.task);
      this.addTaskForm.patchValue(taskRepresentation);
    }

    if (changes['clearTaskForm$']) {
      this.clearTaskForm$.subscribe(() => this.resetAddTask());
    }

    if (changes['submitTaskForm$']) {
      this.submitTaskForm$.subscribe(() => this.saveTask());
    }

    if (changes['deleteTask$']) {
      this.deleteTask$.subscribe(() => this.deleteTask());
    }

    if (changes['predefinedTaskRequest'] && !!this.predefinedTaskRequest) {
      this.addTaskForm.reset(this.predefinedTaskRequest);
    }
  }

  addTaskForm = new FormGroup({
    title: new FormControl('', Validators.compose([Validators.required])),
    description: new FormControl(''),
    category: new FormControl<number | null>(null, Validators.compose([Validators.required])),
    assignees: new FormControl(<number[]>[], Validators.compose([Validators.nullValidator])),
    dueDate: new FormControl<Date | null>(null, Validators.compose([Validators.required, Validators.nullValidator])),
    priority: new FormControl<PriorityType | null>(null, Validators.compose([Validators.required, Validators.nullValidator])),
    subtasks: new FormControl(<SubtaskRequest[]>[], Validators.compose([Validators.nullValidator]))
  });

  addSubtaskForm = new FormControl('');

  addCategory() {
    debugger;
    const dialogRef = this.addTaskService.dialog.open(AddCategoryComponent);
    dialogRef.afterClosed().subscribe(newCategory => {
      if (newCategory) {
        this.updateCategories();
      }
    });
  }

  addContact() {
    const dialogRef = this.addTaskService.dialog.open(AddContactComponent);
    dialogRef.afterClosed().subscribe(newContact => {
      if (newContact) {
        this.updateContacts();
      }
    });
  }

  updateCategories() {
    this.categories$ = this.addTaskService.scrumCategory.getCategories$();
  }

  updateContacts() {
    this.contacts$ = this.addTaskService.scrumContacts.getContacts$();
  }

  updateSubtasks() {
    this.subtasks$ = this.addTaskService.scrumSubtasks.getSubtasks$();
    this.addSubtaskForm.reset();
  }

  getCategoryOptionHTML(option: CategoryResponse) {
    return `
    <span class="category-option">
      <span  class="category-color" style="background-color: ${option.color}"></span>
      <span class="category-name">${option.name}</span>
    </span>`;
  }

  getPriorityOptionHTML(option: Priority) {
    return `
    <span class="priority-option">
      <span class="priority-option">${option.name?.toUpperCase()}</span>
      <img class="priority-icon" src="assets/${option.name?.toLowerCase()}.svg" alt="Priority Icon">
    </span>
    `;
  }

  addSubtask() {
    if (this.addSubtaskForm.value) {
      const newSubtask = { title: this.addSubtaskForm.value, done: false } as SubtaskRequest;
      this.pushSubtask(newSubtask);
      this.addSubtaskForm.reset();
    }
  }

  pushSubtask(subtask: SubtaskRequest) {
    const currentSubtasks = this.addTaskForm.get('subtasks')?.value as SubtaskRequest[];
    currentSubtasks.push(subtask);
    this.addTaskForm.get('subtasks')?.patchValue(currentSubtasks);
  }

  popSubtask(subtask: SubtaskRequest) {
    const currentSubtasks = this.addTaskForm.get('subtasks')?.value as SubtaskRequest[];
    currentSubtasks.splice(currentSubtasks.indexOf(subtask), 1);
    this.addTaskForm.get('subtasks')?.patchValue(currentSubtasks);
  }

  saveTask() {
    if (this.mode == 'add')
      this.addTask();
    if (this.mode == 'edit')
      this.editTask();
  }

  deleteTask() {
    if (this.mode != 'edit') return;
    this.addTaskService.scrumTask.deleteTask$(this.task.id)
      .subscribe(
        {
          next: (res) => this.deletedTask.emit(this.task.id),
          error: (e) => console.log(e)
        }
      );
  }

  addTask() {
    if (this.addTaskForm.valid) {

      this.addTaskService.scrumTask.addTask$(this.addTaskForm.value as Partial<TaskRequest>)
        .subscribe(
          {
            next: (res) => {
              const feedbackRef = this.feedback.openSnackBar('Task Created!', 'To Board');
              feedbackRef?.afterDismissed().subscribe({
                next: (value) => this.addTaskService.router.navigate(['/board'])
              });
            },
            error: (e) => console.log(e)
          }
        );
    }
  }

  editTask() {
    if (this.addTaskForm.valid) {
      const toEditTask = this.addTaskForm.value as Partial<TaskRequest>;
      this.addTaskService.scrumTask.updateTask$(this.task.id, toEditTask)
        .subscribe(
          {
            next: (res) => this.editedTask.emit(res),
            error: (e) => console.log(e)
          }
        );
    }
  }

  /**
   * How to update subtask from Edit Form?
   * 1. Update each subtask on check and remove them from Update Task Request.
   * 2. Update only the FormControl of each subtask on check and send full Task Upload Payload
   *    - Backend requires change
   * @param checked
   * @param subtask
   */
  updateSubtaskCheck(checked: boolean, subtask: SubtaskRequest) {
    subtask.done = checked;
    // if (this.mode == 'edit') {
    //   const subtaskId = subtask.id as number;
    //   this.scrumSubtasks.updateSubtask$(subtaskId, subtask).subscribe(editSubtask => console.log(editSubtask));
    // }
  }

  handleSelectSubtask(subtask: SubtaskResponse, checked: boolean) {
    if (checked)
      this.pushSubtask(subtask);
    else
      this.popSubtask(subtask);
  }

  get matchWebBreakpoint$() {
    return this.addTaskService.breakPoints.matchesWebBreakpoint$.pipe(
      map(match => match && this.showPageTitle)
    );
  }

  resetAddTask() {
    this.addTaskForm.reset(this.InitTask);
    this.addSubtaskForm.reset();
  }

  removeSubtask(subtaskToRemove: SubtaskRequest) {
    const subtasks = this.addTaskForm.get('subtasks')?.value;
    const patchedSubtasks = subtasks?.filter(st => st != subtaskToRemove) as SubtaskRequest[];
    this.addTaskForm.get('subtasks')?.patchValue(patchedSubtasks);
  }

  // editSubtask(subtaskTitleView: HTMLElement, inputSubtaskEdit: HTMLInputElement) {
  //   subtaskTitleView.style.display = "none";
  //   inputSubtaskEdit.style.display = "inline";
  //   inputSubtaskEdit.focus();
  // }

  editSubtask(){
    this.changingSubtaskTitle$.next(true);
  }

  // updateSubtaskTitle(subtask: SubtaskRequest, subtaskTitleView: HTMLElement, inputSubtaskEdit: HTMLInputElement) {
  //   console.log(subtask);
  //   subtaskTitleView.style.display = "inline";
  //   inputSubtaskEdit.style.display = "none";
  // }

}
export { TaskMode, PriorityType };

