
import { PriorityType } from "src/app/admin/add-task/add-task.module";
import { Category, CategoryResponse, CategoryResponseAPI } from "./category.model";
import { Contact, ContactResponse, ContactResponseAPI } from "./contact.model";
import { Subtask, SubtaskRequest, SubtaskRequestAPI, SubtaskResponse, SubtaskResponseAPI } from "./subtask.model";

/**
 * JSON format in front end for create, update, path, put request
 */
export interface TaskRequest {
  title: string;
  description: string;
  category: number;
  assignees: number[];
  dueDate: Date;
  priority: PriorityType;
  subtasks: SubtaskRequest[];
  list: number | null | '';
  position: number;
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
  priority: PriorityType;
  subtasks: SubtaskResponse[];
  createdAt: Date;
  updatedAt: Date;
  position: number;
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
  priority: PriorityType;
  subtasks: SubtaskRequestAPI[];
  list: number | null | '';
  position: number;
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
  priority: PriorityType;
  subtasks: SubtaskResponseAPI[];
  created_at: string;
  updated_at: string;
  position: number;
}

export class Task {

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
      subtasks: task.subtasks.map(s => Subtask.createInternalValue(s)),
      position: task.position
    };
  }

  static createRepresentation(task: Partial<TaskRequest>): Partial<TaskRequestAPI> {
    return {
      title: task.title,
      description: task.description,
      category: task.category,
      assignees: task.assignees,
      due_date: task.dueDate?.toISOString().slice(0, 10),
      priority: task.priority,
      subtasks: task.subtasks,
      list: task.list,
      position: task.position
    };
  }

  static convertToRepresentation(task: TaskResponse): Partial<TaskRequest> {
    return {
      title: task.title,
      description: task.description,
      category: task.category?.id,
      assignees: task.assignees.map(a => a.id),
      dueDate: task.dueDate,
      priority: task.priority,
      subtasks: task.subtasks.map(s => Subtask.convertToRepresentation(s)),
      position: task.position
    };
  }

}