import { Task, TaskResponse, TaskResponseAPI } from "./task.model";

export interface ListResponseAPI {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    tasks: TaskResponseAPI[];
    position: number;
}

export interface ListResponse {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: TaskResponse[];
    position: number;
}

export interface ListRequestAPI {
    name: string;
    board: number;
    position: number;
}

export interface ListRequest {
    name: string;
    board: number;
    position: number;
}

export class List {

    static createInternalValue(list: ListResponseAPI): ListResponse {
        return {
            id: list.id,
            name: list.name,
            createdAt: new Date(list.created_at),
            updatedAt: new Date(list.updated_at),
            tasks: list.tasks?.map(t => Task.createInternalValue(t)) || [],
            position: list.position
        };
    }

    static createRepresentation(list: Partial<ListRequest>): Partial<ListRequestAPI> {
        return {
            name: list.name,
            board: list.board,
            position: list.position
        };
    }
}