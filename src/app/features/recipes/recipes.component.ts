import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {Table, TableModule} from "primeng/table";
import {Recipe} from "./models/recipe";
import {RecipeService} from "./services/recipe.service";
import {DialogFormComponent} from '../../components/dialog-form/dialog-form.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {EntityType} from "../../enums/entity-type";
import {FormType} from "../../enums/form-type";
import {Category} from "../categories/models/category";
import {DialogInfoComponent} from "../../components/dialog-info/dialog-info.component";

@Component({
    selector: 'app-recipes',
    imports: [
        ButtonDirective,
        IconField,
        InputIcon,
        InputText,
        TableModule,
        Button
    ],
    standalone: true,
    providers: [DialogService, MessageService, ConfirmationService],
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
    @Input() recipes!: Recipe[];

    @ViewChild(`filter`) filter!: ElementRef;

    constructor(private recipeService: RecipeService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private dialogService: DialogService) {
    }

    ngOnInit(): void {
        this.recipeService.getAllRecipes().subscribe((response: Recipe[]) => {
            this.recipes = response.map((x: Recipe) =>
                Object.assign(new Recipe(), x)
            );
        })
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    openCreateDialog() {
        this.dialogService.open(DialogFormComponent, {
            header: 'Add New Recipe',
            data: {
                contentType: EntityType.Recipe,
                formType: FormType.Create
            }
        });
    }

    openInfoDialog(recipe: Recipe) {
        this.dialogService.open(DialogInfoComponent, {
            header: 'Details for ' + recipe.title,
            data: {
                contentType: EntityType.Recipe,
                data: recipe
            }
        });
    }

    openUpdateDialog(recipe: Recipe) {
        this.dialogService.open(DialogFormComponent, {
            header: 'Update data for ' + recipe.title,
            data: {
                contentType: EntityType.Recipe,
                formType: FormType.Update,
                data: recipe
            }
        });
    }

    confirmDelete(recipe: Recipe) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this recipe?',
            header: 'Confirm deletion of ' + recipe.title,
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'No',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Yes',
            },
            accept: () => {
                this.recipeService.deleteRecipe(recipe.id)
                    .subscribe((response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Recipe has been deleted.'
                        });
                    }, error => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Error deleting recipe.'
                        });
                    });
            }
        });
    }
}
