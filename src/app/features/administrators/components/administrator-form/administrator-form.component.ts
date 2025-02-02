import {Component, Input} from '@angular/core';
import {Button} from "primeng/button";
import {InputText} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormType} from "../../../../enums/form-type";
import {ValidationService} from "../../../../services/validation.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Administrator} from "../../models/administrator";
import {AdministratorService} from "../../services/administrator.service";

@Component({
    selector: 'app-administrator-form',
    imports: [
        Button,
        InputText,
        NgIf,
        ReactiveFormsModule
    ],
    standalone: true,
    templateUrl: './administrator-form.component.html',
    styleUrl: './administrator-form.component.scss'
})
export class AdministratorFormComponent {
    @Input() type!: FormType;
    @Input() administrator!: Administrator;

    form!: FormGroup;

    loadingData = false;

    constructor(
        public validationService: ValidationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private administratorService: AdministratorService,
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
                this.createAdministrator() : this.updateAdministrator();
        }
    }

    private initForm = () => this.type == FormType.Create ?
        this.initCreateForm() : this.initUpdateForm();

    private initCreateForm() {
        this.form = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.maxLength(50)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]]
        })
    }

    private initUpdateForm() {
        this.form = this.formBuilder.group({
            firstName: [this.administrator.firstName, [Validators.required, Validators.maxLength(50)]],
            lastName: [this.administrator.lastName, [Validators.required, Validators.maxLength(50)]],
        })
    }

    private createAdministrator() {
        this.administratorService.createAdministrator(this.form.value).subscribe((response: Administrator) => {
            this.administrator = Object.assign(response as Administrator);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Administrator is Created Successfully.'
            });
            this.loadingData = false;
        }, error => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Creating Administrator',
                detail: error.message
            });
            this.loadingData = false;
        })
    }

    private updateAdministrator() {
        this.administratorService.updateAdministrator(this.administrator.id, this.form.value).subscribe((response: Administrator) => {
            this.administrator = Object.assign(response as Administrator);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Administrator is Updated Successfully.'
            });
            this.loadingData = false;
        }, error => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Updating Administrator',
                detail: error.message
            });
            this.loadingData = false;
        })
    }
}
