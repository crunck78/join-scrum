export interface SubtaskRequest {
    id?: number;
    task?: number;
    title: string;
    done: boolean;
}

export interface SubtaskRequestAPI {
    task?: number;
    title: string;
    done: boolean;
}

export interface SubtaskResponse {
    id: number;
    title: string;
    done: boolean;
    createdAt: Date;
    updateAt: Date;
}

export interface SubtaskResponseAPI {
    id: number;
    title: string;
    done: boolean;
    created_at: string;
    updated_at: string;
}

export class Subtask {

    static createInternalValue(subtask: SubtaskResponseAPI): SubtaskResponse {
        return {
            title: subtask.title,
            done: subtask.done,
            createdAt: new Date(subtask.created_at),
            updateAt: new Date(subtask.updated_at),
            id: subtask.id,
        };
    }

    static createRepresentation(subtask: Partial<SubtaskRequest>): Partial<SubtaskRequestAPI> {
        return {
            task: subtask.task,
            title: subtask.title,
            done: subtask.done
        };
    }

    static convertToRepresentation(subtask: SubtaskResponse): SubtaskRequest {
        return {
          title: subtask.title,
          done: subtask.done,
          id: subtask.id
        }
      }
}