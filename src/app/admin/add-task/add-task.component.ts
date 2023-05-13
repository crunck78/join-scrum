import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Category, ScrumCategoriesService } from 'src/app/scrum-api/scrum-categories/scrum-categories.service';
import { Contact, ScrumContactsService } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { AddCategoryComponent } from 'src/app/shared/shared-components/dialogs/add-category/add-category/add-category.component';
import { AddContactComponent } from 'src/app/shared/shared-components/dialogs/add-contact/add-contact.component';
import { AddTaskDialogComponent } from 'src/app/shared/shared-components/dialogs/add-task-dialog/add-task-dialog.component';
import { FormFieldComponent } from 'src/app/shared/shared-components/form-field/form-field.component';
import { OptionsPipe } from 'src/app/shared/shared-components/form-field/options.pipe';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { MatDividerModule } from '@angular/material/divider';
import { ScrumSubtasksService, Subtask } from 'src/app/scrum-api/scrum-subtasks/scrum-subtasks.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScrumTasksService } from 'src/app/scrum-api/scrum-tasks/scrum-tasks.service';

export interface Priority {
  name?: string,
  icon?: string,
  color?: string
}

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
    MatCheckboxModule
  ]
})
export class AddTaskComponent {

  categories$!: Observable<Category[]>;
  contacts$!: Observable<Contact[]>;
  subtasks$!: Observable<Subtask[]>

  constructor(private scrumCategory: ScrumCategoriesService,
    private scrumContacts: ScrumContactsService,
    private dialog: MatDialog,
    private scrumSubtasks: ScrumSubtasksService,
    private scrumTask: ScrumTasksService) {
    this.updateCategories();
    this.updateContacts();
    this.updateSubtasks();
  }

  addTaskForm = new FormGroup({
    title: new FormControl('', Validators.compose([Validators.required])),
    description: new FormControl(''),
    category: new FormControl(0, Validators.compose([Validators.required])),
    assignees: new FormControl(<number[]>[], Validators.compose([Validators.nullValidator])),
    dueDate: new FormControl<Date>(new Date(Date.now()), Validators.compose([Validators.required])),
    priority: new FormControl<'Low' | 'Medium' | 'Urgent'>('Low', Validators.compose([Validators.required])),
    subtasks: new FormControl(<number[]>[], Validators.compose([Validators.nullValidator]))
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

  updateSubtasks(){
    this.subtasks$ = this.scrumSubtasks.getSubtasks$();
    this.addSubtaskForm.reset();
  }

  getCategoryOptionHTML(option: Category) {
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

  addSubtask() {
    if (this.addSubtaskForm.valid) {
      this.scrumSubtasks.addSubtask$({ title: this.addSubtaskForm.value, done: false } as Subtask).subscribe(
        {
          next: (res) => this.updateSubtasks(),
          error: (err) => console.log(err)
        }
      );
    }
  }

  pushSubtask(subtask: Subtask) {
    const currentSubtasks = this.addTaskForm.get('subtasks')?.value as number[];
    currentSubtasks.push(subtask.id);
    this.addTaskForm.get('subtasks')?.patchValue(currentSubtasks);
  }

  popSubtask(subtask: Subtask){
    const currentSubtasks = this.addTaskForm.get('subtasks')?.value as number[];
    currentSubtasks.splice(currentSubtasks.indexOf(subtask.id), 1);
    this.addTaskForm.get('subtasks')?.patchValue(currentSubtasks);
  }

  addTask() {
    if(this.addTaskForm.valid){

        this.scrumTask.addTask$(this.addTaskForm.value)
        .subscribe(
          {
            next: (res)=> console.log(res),
            error: (e) => console.log(e)
          }
        )
    }
  }

  handleSelectSubtask(subtask: Subtask, checked: boolean){
    if(checked)
      this.pushSubtask(subtask);
    else
      this.popSubtask(subtask);
  }

}
