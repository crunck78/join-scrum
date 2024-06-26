import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ScrumCategoriesService } from 'src/app/scrum-api/scrum-categories/scrum-categories.service';
import { ScrumContactsService } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';
import { ScrumSubtasksService } from 'src/app/scrum-api/scrum-subtasks/scrum-subtasks.service';
import { ScrumTasksService } from 'src/app/scrum-api/scrum-tasks/scrum-tasks.service';

@Injectable({
  providedIn: 'any'
})
export class AddTaskService {

  constructor(
    public scrumCategory: ScrumCategoriesService,
    public scrumContacts: ScrumContactsService,
    public dialog: MatDialog,
    public scrumSubtasks: ScrumSubtasksService,
    public scrumTask: ScrumTasksService,
    public router: Router
  ) { }

  get categories$() {
    return this.scrumCategory.getCategories$();
  }

  get contacts$() {
    return this.scrumContacts.getContacts$();
  }

  get subtasks$() {
    return this.scrumSubtasks.getSubtasks$();
  }
}
