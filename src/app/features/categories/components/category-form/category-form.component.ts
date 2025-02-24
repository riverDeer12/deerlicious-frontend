import {Component, Input} from '@angular/core';
import {FormType} from "../../../../enums/form-type";
import {Category} from "../../models/category";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ValidationService} from "../../../../services/validation.service";
import {InputText} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CommonModule} from "@angular/common";
import {CategoryService} from "../../services/category.service";
import {RedirectType} from "../../../../enums/redirect-type";
import {HelperService} from "../../../../services/helper.service";
import {MultiSelect} from "primeng/multiselect";
import {Recipe} from "../../../recipes/models/recipe";
import {Permission} from "../../../roles/roles/models/permission";
import {RecipeService} from "../../../recipes/services/recipe.service";

@Component({
    selector: 'app-category-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputText,
        ButtonModule,
        MultiSelect
    ],
    templateUrl: './category-form.component.html',
    styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
    @Input() type!: FormType;
    @Input() category!: Category;
    @Input() redirectType!: RedirectType;
    @Input() dialogId!: string;
    @Input() returnUrl!: string;

    form!: FormGroup;

    recipes!: Recipe[];

    loadingData = false;

    constructor(
        public validationService: ValidationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private categoryService: CategoryService,
        private helperService: HelperService,
        private recipeService: RecipeService,
        private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.initForm();
        this.getRecipes();
    }

    submit() {
        this.loadingData = true;

        if (this.form.invalid) {

            this.form.markAllAsTouched();

            this.messageService
                .add({
                    severity: 'warn',
                    summary: 'Incomplete or incorrect data',
                    detail: 'Check the entered data and try again.'
                });

            this.loadingData = false;

            return;
        }

        this.type == FormType.Create ?
            this.createCategory() : this.updateCategory();
    }

    private initForm = () => this.type == FormType.Create ?
        this.initCreateForm() : this.initUpdateForm();

    private initCreateForm() {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.maxLength(50)]],
            recipes: ['']
        })
    }

    private initUpdateForm() {
        this.form = this.formBuilder.group({
            name: [this.category.name, [Validators.required, Validators.maxLength(50)]],
            description: [this.category.description, [Validators.required, Validators.maxLength(50)]],
            recipes: [this.category.recipes.map(x => x.id)]
        })
    }

    private createCategory() {
        this.categoryService.createCategory(this.form.value).subscribe((response: Category) => {
            this.category = Object.assign(response as Category);

            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Category is Created Successfully.'
            });

            this.helperService
                .redirectUserAfterSubmit(this.redirectType, this.returnUrl, this.dialogId);

            this.loadingData = false;

        }, error => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Creating Category',
                detail: error.message
            });
            this.loadingData = false;
        })
    }

    private updateCategory() {
        this.categoryService.updateCategory(this.category.id, this.form.value).subscribe((response: Category) => {
            this.category = Object.assign(response as Category);

            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Category is Updated Successfully.'
            });

            this.helperService
                .redirectUserAfterSubmit(this.redirectType, this.returnUrl, this.dialogId)

            this.loadingData = false;

        }, error => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Updating Category',
                detail: error.message
            });
            this.loadingData = false;
        })
    }

    private getRecipes() {
        this.recipeService.getAllRecipes().subscribe((response: Recipe[]) => {
            this.recipes = response.map((x: Recipe) =>
                Object.assign(new Recipe(), x)
            );
        })
    }
}
