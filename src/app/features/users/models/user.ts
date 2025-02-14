export class User {
    id!: string;
    username!: string;
    email!: string;
    createdAt!: Date;
    updatedAt!: Date;
    isDeleted!: boolean;

    get status(): string {
        return this.isDeleted ? 'Inactive' : 'Active';
    }
}
