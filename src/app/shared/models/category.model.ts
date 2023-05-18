export interface CategoryResponse {
    name: string,
    color: string
    createdAt: Date;
    updateAt: Date;
    id: number;
}

export interface CategoryResponseAPI {
    name: string,
    color: string
    created_at: string;
    update_at: string;
    id: number;
}

export interface CategoryRequest {
    name: string,
    color: string
}

export interface CategoryRequestAPI {
    name: string,
    color: string
}

export class Category{
    name!: string;
    color!: string;
    createdAt!: Date;
    updateAt!: Date;
    id!: number;

    static createInternalValue(category: CategoryResponseAPI) : CategoryResponse{
        return {
            color: category.color,
            name : category.name,
            createdAt : new Date(category.created_at),
            updateAt : new Date(category.update_at),
            id : category.id,
        };
    }

    static createRepresentation(category: Partial<CategoryRequest>) : Partial<CategoryRequestAPI>{
        return {
            color : category.color,
            name : category.name,
        };
    }
}