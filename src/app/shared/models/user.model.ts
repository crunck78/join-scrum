export interface UserResponse {
    id: number;
    email: string;
    name: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserResponseAPI {
    id: number;
    email: string;
    name: string;
    image: string | null;
    created_at: string;
    updated_at: string;
}

export interface UserRequest {
    email: string;
    name: string;
    image: string | null;
}

export interface UserRequestAPI {
    email: string;
    name: string;
    image: string | null;
}

export class User {
    static createInternalValue(user: UserResponseAPI): UserResponse {

        return {
            createdAt: new Date(user.created_at),
            updatedAt: new Date(user.updated_at),
            id: user.id,
            image: user.image,
            email: user.email,
            name: user.name
        };
    }

    static createRepresentation(user: Partial<UserRequest>): Partial<UserRequestAPI> {
        return {
            email: user.email,
            name: user.name,
            image: user.image
        };
    }
}