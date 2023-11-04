export interface ContactResponse {
    email: string;
    name: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    id: number;
}

export interface ContactResponseAPI {
    email: string;
    name: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
    id: number;
}

export interface ContactRequest {
    email: string;
    name: string;
    phoneNumber: string;
}

export interface ContactRequestAPI {
    email: string;
    name: string;
    phone_number: string;
}

export class Contact {

    static createInternalValue(contact: ContactResponseAPI) : ContactResponse{
        return {
            phoneNumber : contact.phone_number,
            email : contact.email,
            name : contact.name,
            createdAt : new Date(contact.created_at),
            updatedAt : new Date(contact.updated_at),
            id : contact.id,
        };
    }

    static createRepresentation(contact: Partial<ContactRequest>) : Partial<ContactRequestAPI>{
        return {
            phone_number : contact.phoneNumber,
            email : contact.email,
            name : contact.name,
        };
    }
}