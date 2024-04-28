import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { TaskResponse } from '../../models/task.model';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  const task = {
    id: 1,
    title: "Some Task",
    description: "Some Description",
    category: null,
    assignees: [],
    dueDate: new Date(),
    priority: "Low",
    subtasks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    position: 1
  } as TaskResponse

  beforeEach(async () => {
    await TestBed.configureTestingModule({})
      .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
