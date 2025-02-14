export class Recipe {
    id!: string;
    title!: string;
    content!: string;
    isDeleted!: boolean;

    get status(): string {
        return this.isDeleted ? 'Inactive' : 'Active';
    }
}
