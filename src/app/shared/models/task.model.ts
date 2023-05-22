import { Category, CategoryResponse, CategoryResponseAPI } from "./category.model";
import { Contact, ContactResponse, ContactResponseAPI } from "./contact.model";
import { ListRequest } from "./list.model";
import { Subtask, SubtaskResponse, SubtaskResponseAPI } from "./subtask.model";
import { UserResponse } from "./user.model";

/**
 * JSON format in front end for create, update, path, put request
 */
export interface TaskRequest {
  id: string;
  title: string;
  description: string;
  category: number;
  assignees: number[];
  dueDate: Date;
  priority: 'Low' | 'Medium' | 'Urgent';
  subtasks: number[];
  list: number | null;
}

/**
 * JSON format in front end for response
 */
export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  category: CategoryResponse | null;
  assignees: ContactResponse[];
  dueDate: Date;
  priority: 'Low' | 'Medium' | 'Urgent';
  subtasks: SubtaskResponse[];
  createdAt: Date;
  updatedAt: Date;
}

/**
* API expected JSON format
*/
export interface TaskRequestAPI {
  title: string;
  description: string;
  category: number;
  assignees: number[];
  due_date: string;
  priority: 'Low' | 'Medium' | 'Urgent';
  subtasks: number[];
  list: number | null;
}

/**
 * API expected JSON response format
 */
export interface TaskResponseAPI {
  id: number;
  title: string;
  description: string;
  category: CategoryResponseAPI | null;
  assignees: ContactResponseAPI[];
  due_date: string;
  priority: 'Low' | 'Medium' | 'Urgent';
  subtasks: SubtaskResponseAPI[];
  created_at: string;
  updated_at: string;
}

export class Task {
  id!: number;
  title!: string;
  description!: string;
  category!: Category;
  assignees!: Contact[];
  dueDate!: Date;
  priority!: 'Low' | 'Medium' | 'Urgent';
  subtasks!: Subtask[];
  createdAt!: Date;
  updatedAt!: Date;

  static createInternalValue(task: TaskResponseAPI): TaskResponse {

    return {
      createdAt: new Date(task.created_at),
      updatedAt: new Date(task.updated_at),
      id: task.id,
      title: task.title,
      description: task.description,
      category: task.category ? Category.createInternalValue(task.category) : null,
      assignees: task.assignees.map(a => Contact.createInternalValue(a)),
      dueDate: new Date(task.due_date),
      priority: task.priority,
      subtasks: task.subtasks.map(s => Subtask.createInternalValue(s))
    };
  }

  static createRepresentation(task: Partial<TaskRequest>): Partial<TaskRequestAPI> {
    return {
      title: task.title,
      description: task.description,
      category: task.category,
      assignees: task.assignees,
      due_date: task.dueDate?.toISOString().slice(0, 10) || new Date(Date.now()).toISOString().slice(0, 10),
      priority: task.priority || 'Low',
      subtasks: task.subtasks,
      list: task.list
    };
  }

}