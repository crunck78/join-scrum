export interface UserResponse {
    id: number;
    email: string;
    name: string;
    image: string | null;
}

export interface UserResponseAPI {
    id: number;
    email: string;
    name: string;
    image: string | null;
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

export class User{
    id!: number;
    email!: string;
    name!: string;
    image!: string;
}