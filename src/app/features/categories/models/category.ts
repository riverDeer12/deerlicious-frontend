export class Category {
    id!: string;
    name!: string;
    description!: string;
    createdAt!: Date;
    updatedAt!: Date;
    isDeleted!: boolean;

    get status(): string {
        return this.isDeleted ? 'Inactive' : 'Active';
    }
}
