import { List, ListResponse, ListResponseAPI } from "./list.model";

export interface BoardResponse {
    title: string;
    id: string;
    lists: ListResponse[];
    createdAt: Date;
    updatedAt: Date;
}

export interface BoardRequest {
    title: string;
}

export interface BoardResponseAPI {
    title: string;
    id: string;
    lists: ListResponseAPI[];
    created_at: string;
    updated_at: string;
}

export interface BoardRequestAPI {
    title: string;
}

export class Board {

    static createInternalValue(board: BoardResponseAPI): BoardResponse {
        return {
            title: board.title,
            id: board.id,
            // lists: board.lists?.map(l => List.createInternalValue(l)).sort((a, b) => a.position - b.position).reverse() || [],
            lists: board.lists?.map(l => List.createInternalValue(l)).reverse() || [],
            createdAt: new Date(board.created_at),
            updatedAt: new Date(board.updated_at),
        };
    }

    static createRepresentation(board: Partial<BoardRequest>): Partial<BoardRequestAPI> {
        return {
            title: board.title
        };
    }
}