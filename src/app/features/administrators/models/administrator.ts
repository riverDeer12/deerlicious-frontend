export class Administrator {
    id!: string;
    firstName!: string;
    lastName!: string;
    createdAt!: Date;
    updatedAt!: Date;
    isDeleted!: boolean;

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    get status(): string {
        return this.isDeleted ? 'Inactive' : 'Active';
    }
}
