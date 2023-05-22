import { Task, TaskResponse, TaskResponseAPI } from "./task.model";

export interface ListResponseAPI {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    tasks: TaskResponseAPI[];
}

export interface ListResponse {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: TaskResponse[];
}

export interface ListRequestAPI {
    name: string;
    board: number;
}

export interface ListRequest {
    name: string;
    board: number;
}

export class List {
    id!: number;
    name!: string;
    createdAt!: Date;
    updatedAt!: Date;
    tasks!: Task[];

    static createInternalValue(list: ListResponseAPI): ListResponse {
        return {
            id: list.id,
            name: list.name,
            createdAt: new Date(list.created_at),
            updatedAt: new Date(list.updated_at),
            tasks: list.tasks?.map(t => Task.createInternalValue(t)) || [],
        };
    }

    static createRepresentation(list: Partial<ListRequest>): Partial<ListRequestAPI> {
        return {
            name: list.name,
            board: list.board,
        };
    }
}