import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormControlStatus, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Observable, map } from 'rxjs';
import { ScrumCategoriesService } from 'src/app/scrum-api/scrum-categories/scrum-categories.service';
import { ScrumContactsService } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { AddCategoryComponent } from 'src/app/shared/shared-components/dialogs/add-category/add-category/add-category.component';
import { AddContactComponent } from 'src/app/shared/shared-components/dialogs/add-contact/add-contact.component';
import { AddTaskDialogComponent } from 'src/app/shared/shared-components/dialogs/add-task-dialog/add-task-dialog.component';
import { FormFieldComponent } from 'src/app/shared/shared-components/form-field/form-field.component';
import { OptionsPipe } from 'src/app/shared/shared-components/form-field/options.pipe';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { MatDividerModule } from '@angular/material/divider';
import { ScrumSubtasksService } from 'src/app/scrum-api/scrum-subtasks/scrum-subtasks.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScrumTasksService } from 'src/app/scrum-api/scrum-tasks/scrum-tasks.service';
import { CategoryResponse } from 'src/app/shared/models/category.model';
import { ContactResponse } from 'src/app/shared/models/contact.model';
import { SubtaskRequest, SubtaskResponse } from 'src/app/shared/models/subtask.model';
import { Task, TaskRequest, TaskResponse } from 'src/app/shared/models/task.model';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints.service';

export interface Priority {
  name: string,
  icon: string,
  color: string
}

export declare type PriorityType = 'Low' | 'Medium' | 'Urgent';
export declare type TaskMode = 'add' | 'edit';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AddTaskDialogComponent,
    CommonModule,
    CardComponent,
    PageTitleComponent,
    FormFieldComponent,
    MatOptionModule,
    OptionsPipe,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCheckboxModule,
  ]
})
export class AddTaskComponent implements OnChanges {

  readonly InitTask = {
    title: '',
    description: '',
    category: null,
    assignees: <number[]>[],
    dueDate: new Date(Date.now()),
    priority: <PriorityType>'Low',
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

  @Output() formStatus$ = new EventEmitter<FormControlStatus>();

  constructor(private scrumCategory: ScrumCategoriesService,
    private scrumContacts: ScrumContactsService,
    private dialog: MatDialog,
    private scrumSubtasks: ScrumSubtasksService,
    private scrumTask: ScrumTasksService,
    private breakPoints: BreakpointsService) {
    this.updateCategories();
    this.updateContacts();
    this.updateSubtasks();
    this.addTaskForm.statusChanges.subscribe((status: FormControlStatus) => this.formStatus$.emit(status));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      const taskRepresentation = Task.convertToRepresentation(this.task);
      console.log(taskRepresentation);
      this.addTaskForm.patchValue(taskRepresentation);

    }

    if (changes['clearTaskForm$']) {
      this.clearTaskForm$.subscribe(() => this.addTaskForm.reset(this.InitTask));
    }

    if (changes['submitTaskForm$']) {
      this.submitTaskForm$.subscribe(() => this.saveTask());
    }
  }

  addTaskForm = new FormGroup({
    title: new FormControl('', Validators.compose([Validators.required])),
    description: new FormControl(''),
    category: new FormControl<number | null>(null, Validators.compose([Validators.required])),
    assignees: new FormControl(<number[]>[], Validators.compose([Validators.nullValidator])),
    dueDate: new FormControl<Date>(new Date(Date.now()), Validators.compose([Validators.required])),
    priority: new FormControl<PriorityType>('Low', Validators.compose([Validators.required])),
    subtasks: new FormControl(<SubtaskRequest[]>[], Validators.compose([Validators.nullValidator]))
  });

  addSubtaskForm = new FormControl('');

  addCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent);
    dialogRef.afterClosed().subscribe(newCategory => {
      if (newCategory) {
        this.updateCategories();
      }
    });
  }

  addContact() {
    const dialogRef = this.dialog.open(AddContactComponent);
    dialogRef.afterClosed().subscribe(newContact => {
      if (newContact) {
        this.updateContacts();
      }
    });
  }

  updateCategories() {
    this.categories$ = this.scrumCategory.getCategories$();
  }

  updateContacts() {
    this.contacts$ = this.scrumContacts.getContacts$();
  }

  updateSubtasks() {
    this.subtasks$ = this.scrumSubtasks.getSubtasks$();
    this.addSubtaskForm.reset();
  }

  getCategoryOptionHTML(option: CategoryResponse) {
    return `
    <span class="category-option">
      <span class="category-name">${option.name}</span>
      <span class="category-color" style="background-color: ${option.color}"></span>
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

  // addSubtask() {
  //   if (this.addSubtaskForm.valid) {
  //     this.scrumSubtasks.addSubtask$({ title: this.addSubtaskForm.value, done: false } as SubtaskRequest).subscribe(
  //       {
  //         next: (res) => this.updateSubtasks(),
  //         error: (err) => console.log(err)
  //       }
  //     );
  //   }
  // }

  addSubtask() {
    if (this.addSubtaskForm.valid) {
      const newSubtask = { title: this.addSubtaskForm.value, done: false } as SubtaskRequest;
      this.pushSubtask(newSubtask);
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

  addTask() {
    if (this.addTaskForm.valid) {

      this.scrumTask.addTask$(this.addTaskForm.value as Partial<TaskRequest>)
        .subscribe(
          {
            next: (res) => console.log(res),
            error: (e) => console.log(e)
          }
        )
    }
  }

  editTask() {
    if (this.addTaskForm.valid) {
      const toEditTask = this.addTaskForm.value as Partial<TaskRequest>;
      this.scrumTask.updateTask$(this.task.id, toEditTask)
        .subscribe(
          {
            next: (res) => console.log(res),
            error: (e) => console.log(e)
          }
        )
    }
  }

  // updateSubtask(checked: boolean, subtask: SubtaskRequest) {
  //     subtask.done = checked;
  //     if(this.mode == 'edit'){
  //       const subtaskId = subtask.id as number;
  //       this.scrumSubtasks.updateSubtask$( subtaskId ,subtask).subscribe(editSubtask => console.log(editSubtask));
  //     }
  // }

  /**
   * How to update subtask from Edit Form?
   * 1. Update each subtask on check and remove them from Update Task Request.
   * 2. Update only the FormControl of each subtask on check and send full Task Upload Payload
   *    - Backend requires change
   * @param checked
   * @param subtask
   */
  updateSubtask(checked: boolean, subtask: SubtaskRequest) {
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
    return this.breakPoints.matchesWebBreakpoint$.pipe(
      map(match => match && this.showPageTitle)
    );
  }

}
