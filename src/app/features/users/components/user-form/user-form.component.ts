import {Component, Input} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormType} from "../../../../enums/form-type";
import {ValidationService} from "../../../../services/validation.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-user-form',
    imports: [
        ButtonModule,
        InputTextModule,
        CommonModule,
        ReactiveFormsModule
    ],
    standalone: true,
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
    @Input() type!: FormType;
    @Input() user!: User;

    form!: FormGroup;

    loadingData = false;

    constructor(
        public validationService: ValidationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
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
                this.createUser() : this.updateUser();
        }
    }

    private initForm = () => this.type == FormType.Create ?
        this.initCreateForm() : this.initUpdateForm();

    private initCreateForm() {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required, Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.maxLength(50)]]
        })
    }

    private initUpdateForm() {
        this.form = this.formBuilder.group({
            username: [this.user.username, [Validators.required, Validators.maxLength(50)]],
            email: [this.user.email, [Validators.required, Validators.maxLength(50)]],
        })
    }

    private createUser() {
        this.userService.createUser(this.form.value).subscribe((response: User) => {
            this.user = Object.assign(response as User);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'User is Created Successfully.'
            });
            this.loadingData = false;
        }, error => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Creating User',
                detail: error.message
            });
            this.loadingData = false;
        })
    }

    private updateUser() {
        this.userService.updateUser(this.user.id, this.form.value).subscribe((response: User) => {
            this.user = Object.assign(response as User);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'User is Updated Successfully.'
            });
            this.loadingData = false;
        }, error => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Updating User',
                detail: error.message
            });
            this.loadingData = false;
        })
    }
}
