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


@Component({
    selector: 'app-category-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputText,
        ButtonModule
    ],
    providers: [
        MessageService
    ],
    templateUrl: './category-form.component.html',
    styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
    @Input() type!: FormType;
    @Input() category!: Category;

    form!: FormGroup;

    loadingData = false;

    constructor(
        public validationService: ValidationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private categoryService: CategoryService,
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

            this.type == FormType.Create ?
                this.createCategory() : this.updateCategory();
        }
    }

    private initForm = () => this.type == FormType.Create ?
        this.initCreateForm() : this.initUpdateForm();

    private initCreateForm() {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.maxLength(50)]]
        })
    }

    private initUpdateForm() {
        this.form = this.formBuilder.group({
            name: [this.category.name, [Validators.required, Validators.maxLength(50)]],
            description: [this.category.description, [Validators.required, Validators.maxLength(50)]],
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
}
