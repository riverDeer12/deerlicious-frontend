import {Component, Input} from '@angular/core';
import {Button, ButtonModule} from "primeng/button";
import {InputText, InputTextModule} from "primeng/inputtext";
import {CommonModule, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormType} from "../../../../enums/form-type";
import {ValidationService} from "../../../../services/validation.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Recipe} from "../../models/recipe";
import {RecipeService} from "../../services/recipe.service";

@Component({
    selector: 'app-recipe-form',
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        ReactiveFormsModule
    ],
    providers: [
        MessageService
    ],
    standalone: true,
    templateUrl: './recipe-form.component.html',
    styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent {
    @Input() type!: FormType;
    @Input() recipe!: Recipe;

    form!: FormGroup;

    loadingData = false;

    constructor(
        public validationService: ValidationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private recipeService: RecipeService,
        private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.initForm();
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
            this.createRecipe() : this.updateRecipe();
    }

    private initForm = () => this.type == FormType.Create ?
        this.initCreateForm() : this.initUpdateForm();

    private initCreateForm() {
        this.form = this.formBuilder.group({
            title: ['', [Validators.required, Validators.maxLength(50)]],
            content: ['', [Validators.required, Validators.maxLength(50)]]
        })
    }

    private initUpdateForm() {
        this.form = this.formBuilder.group({
            firstName: [this.recipe.title, [Validators.required, Validators.maxLength(50)]],
            lastName: [this.recipe.content, [Validators.required, Validators.maxLength(50)]],
        })
    }

    private createRecipe() {
        this.recipeService.createRecipe(this.form.value).subscribe((response: Recipe) => {
            this.recipe = Object.assign(response as Recipe);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Recipe is Created Successfully.'
            });
            this.loadingData = false;
        }, error => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Creating Recipe',
                detail: error.message
            });
            this.loadingData = false;
        })
    }

    private updateRecipe() {
        this.recipeService.updateRecipe(this.recipe.id, this.form.value).subscribe((response: Recipe) => {
            this.recipe = Object.assign(response as Recipe);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Recipe is Updated Successfully.'
            });
            this.loadingData = false;
        }, error => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Updating Recipe',
                detail: error.message
            });
            this.loadingData = false;
        })
    }
}
