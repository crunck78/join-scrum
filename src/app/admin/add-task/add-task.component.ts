import {
  Component, EventEmitter, Input, OnChanges, Output, SimpleChanges
} from '@angular/core';
import {
  FormControl, FormControlStatus, FormGroup, Validators
} from '@angular/forms';
import {
  Observable, Subject, take
} from 'rxjs';
import {
  AddTaskModule, Priority, PriorityType, TaskFormGroup, TaskMode
} from './add-task.module';
import { AddTaskService } from './add-task.service';
import { CategoryResponse } from 'src/app/shared/models/category.model';
import { ContactResponse } from 'src/app/shared/models/contact.model';
import { SubtaskRequest, SubtaskResponse } from 'src/app/shared/models/subtask.model';
import { TaskResponse, TaskRequest, Task } from 'src/app/shared/models/task.model';
import { AddCategoryComponent } from 'src/app/shared/shared-components/dialogs/add-category/add-category.component';
import { AddContactComponent } from 'src/app/shared/shared-components/dialogs/add-contact/add-contact.component';
import { FeedbackService } from 'src/app/shared/shared-services/feedback/feedback.service';
import { MatSnackBarDismiss } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  standalone: true,
  imports: [AddTaskModule],
  providers: [AddTaskService]
})
export class AddTaskComponent implements OnChanges {

  /**
   * Empty Valid Form Group Initial Values
   * Ca be used for instance to clear the Form Group or validate Partials given Form Group Values
   */
  readonly InitTask = {
    title: '',
    description: '',
    category: null,
    assignees: <number[]>[],
    dueDate: null,
    priority: null,
    subtasks: <SubtaskRequest[]>[]
  } as TaskFormGroup;

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

  categories$!: Observable<CategoryResponse[]>;
  contacts$!: Observable<ContactResponse[]>;
  subtasks$!: Observable<SubtaskResponse[]>;
  changingSubtaskTitle$ = new Subject<number | string>();

  @Input() showPageTitle = true;
  @Input() task!: TaskResponse;
  @Input() mode: TaskMode = 'add';
  @Input() hideFooter = false;
  @Input() clearTaskForm$!: EventEmitter<void>;
  @Input() submitTaskForm$!: EventEmitter<void>;
  @Input() deleteTask$!: EventEmitter<void>;
  @Input() predefinedTaskRequest!: Partial<TaskRequest>;

  @Output() formStatus$ = new EventEmitter<FormControlStatus>();
  @Output() editedTask$ = new EventEmitter<TaskResponse | null>();
  @Output() addedTask$ = new EventEmitter<TaskResponse | null>();
  @Output() deletedTaskId$ = new EventEmitter<number | null>();

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
      this.addTaskForm.reset(this.validatePredefinedTaskRequest());
    }
  }

  /**
   *
   * Allow to pass an Input Partial Predefined TaskRequest
   * But Resetting Form Group to it may cause issues if not validated.
   */
  private validatePredefinedTaskRequest() {
    const validTaskFormGroup = {} as TaskFormGroup;
    validTaskFormGroup.assignees = this.predefinedTaskRequest.assignees || this.InitTask.assignees;
    validTaskFormGroup.category = this.predefinedTaskRequest.category || this.InitTask.category;
    validTaskFormGroup.description = this.predefinedTaskRequest.description || this.InitTask.description;
    validTaskFormGroup.dueDate = this.predefinedTaskRequest.dueDate || this.InitTask.dueDate;
    validTaskFormGroup.priority = this.predefinedTaskRequest.priority || this.InitTask.priority;
    validTaskFormGroup.subtasks = this.predefinedTaskRequest.subtasks || this.InitTask.subtasks;
    validTaskFormGroup.title = this.predefinedTaskRequest.title || this.InitTask.title;
    return validTaskFormGroup;
  }

  addCategory() {
    const dialogRef = this.addTaskService.dialog.open(AddCategoryComponent);
    dialogRef.afterClosed().subscribe(newCategory => {
      if (newCategory)
        this.updateCategories();
    });
  }

  updateCategories() {
    this.categories$ = this.addTaskService.categories$;
  }

  addContact() {
    const dialogRef = this.addTaskService.dialog.open(AddContactComponent);
    dialogRef.afterClosed().subscribe(newContact => {
      if (newContact)
        this.updateContacts();
    });
  }

  updateContacts() {
    this.contacts$ = this.addTaskService.contacts$;
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
    if (!this.addSubtaskForm.value)
      return;
    const newSubtask = { title: this.addSubtaskForm.value, done: false } as SubtaskRequest;
    this.pushSubtask(newSubtask);
    this.addSubtaskForm.reset();
  }

  handleSelectSubtask(subtask: SubtaskResponse, checked: boolean) {
    if (checked)
      this.pushSubtask(subtask);
    else
      this.popSubtask(subtask);
  }

  pushSubtask(subtask: SubtaskRequest) {
    const currentSubtasks = this.addTaskForm.get('subtasks')?.value as SubtaskRequest[] || [];
    currentSubtasks.push(subtask);
    this.addTaskForm.get('subtasks')?.patchValue(currentSubtasks);
  }

  popSubtask(subtask: SubtaskRequest) {
    const currentSubtasks = this.addTaskForm.get('subtasks')?.value as SubtaskRequest[];
    currentSubtasks.splice(currentSubtasks.indexOf(subtask), 1);
    this.addTaskForm.get('subtasks')?.patchValue(currentSubtasks);
  }

  removeSubtask(subtaskToRemove: SubtaskRequest) {
    const subtasks = this.addTaskForm.get('subtasks')?.value;
    const patchedSubtasks = subtasks?.filter(st => st != subtaskToRemove) as SubtaskRequest[];
    this.addTaskForm.get('subtasks')?.patchValue(patchedSubtasks);
  }

  updateSubtasks() {
    this.subtasks$ = this.addTaskService.subtasks$;
    this.addSubtaskForm.reset();
  }

  editSubtask(subtaskId: number | string) {
    this.changingSubtaskTitle$.next(subtaskId);
  }

  saveTask() {
    if (this.mode == 'add')
      this.addTask();
    if (this.mode == 'edit')
      this.editTask();
  }

  addTask() {
    if (!this.addTaskForm.valid)
      return;
    this.addTaskService.scrumTask.addTask$(this.addTaskForm.value as Partial<TaskRequest>)
      .pipe(take(1))
      .subscribe((newTask) => {
        if(!newTask)
          return;
        this.addedTask$.emit(newTask);
        const feedbackRef = this.feedback.openSnackBar('Task Created!', 'To Board');
        feedbackRef?.afterDismissed()
          .subscribe((value: MatSnackBarDismiss) => {
            if (value.dismissedByAction)
              this.addTaskService.router.navigate(['/board']);
          });
      });
  }

  editTask() {
    if (!this.addTaskForm.valid)
      return;
    const toEditTask = this.addTaskForm.value as Partial<TaskRequest>;
    this.addTaskService.scrumTask.updateTask$(this.task.id, toEditTask)
      .pipe(take(1))
      .subscribe({
        next: (res) => this.editedTask$.emit(res),
      });
  }

  deleteTask() {
    if (this.mode != 'edit')
      return;
    this.addTaskService.scrumTask.deleteTask$(this.task.id)
      .pipe(take(1))
      .subscribe({
        next: () => this.deletedTaskId$.emit(this.task.id),
      });
  }

  resetAddTask() {
    this.addTaskForm.reset(this.InitTask);
    this.addSubtaskForm.reset();
  }

}
export { TaskMode, PriorityType };
