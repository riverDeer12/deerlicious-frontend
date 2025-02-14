export class Administrator {
    id!: string;
    firstName!: string;
    lastName!: string;
    createdAt!: Date;
    updatedAt!: Date;
    isDeleted!: boolean;

    get status(): string {
        return this.isDeleted ? 'Inactive' : 'Active';
    }
}
