export interface ContactResponse {
    email: string;
    name: string;
    phoneNumber: string;
    createdAt: Date;
    updateAt: Date;
    id: number;
}

export interface ContactResponseAPI {
    email: string;
    name: string;
    phone_number: string;
    created_at: string;
    update_at: string;
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
    email!: string;
    name!: string;
    phoneNumber!: string;
    createdAt!: Date;
    updateAt!: Date;
    id!: number;

    // constructor() {
    //     this.email = contact?.email || "";
    //     this.name = contact?.name || "";
    //     this.phoneNumber = contact?.phoneNumber || "";
    //     this.createdAt = contact?.createdAt || new Date(Date.now());
    //     this.updateAt = contact?.updateAt || new Date(Date.now());
    //     this.id = contact?.id || 0;
    // }

    static createInternalValue(contact: ContactResponseAPI) : ContactResponse{
        return {
            phoneNumber : contact.phone_number,
            email : contact.email,
            name : contact.name,
            createdAt : new Date(contact.created_at),
            updateAt : new Date(contact.update_at),
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

    // toInternalValue(contact: ContactResponseAPI) {
    //     this.email = contact.email;
    //     this.name = contact.email;
    //     this.createdAt = new Date(contact.created_at);
    //     this.updateAt = new Date(contact.update_at);
    //     this.id = contact.id;
    // }

    toRepresentation() : ContactRequestAPI {
        return {
            email: this.email,
            name: this.name,
            phone_number: this.phoneNumber,
        }
    }
}