import {Component, Input} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Button} from "primeng/button";
import {InputText} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormType} from "../../../enums/form-type";
import {Recipe} from "../../recipes/models/recipe";
import {ValidationService} from "../../../services/validation.service";
import {Router} from "@angular/router";
import {RecipeService} from "../../recipes/services/recipe.service";
import {MessageService} from "primeng/api";
import {AuthResponse} from "../models/auth-response";

@Component({
    selector: 'app-login',
    imports: [
        Button,
        InputText,
        NgIf,
        ReactiveFormsModule
    ],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    form!: FormGroup;

    loadingData = false;

    authResponse!: AuthResponse;

    constructor(
        public validationService: ValidationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
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

        this.login();
    }

    private initForm() {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required, Validators.maxLength(50)]],
            password: ['', [Validators.required, Validators.maxLength(50)]],
            rememberMe: [false, [Validators.required]]
        })
    }

    private login() {
        this.authenticationService.login(this.form.value).subscribe((response: AuthResponse) => {
            this.authResponse = Object.assign(response as AuthResponse);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Login Is Successfully.'
            });
            this.loadingData = false;
        }, error => {
            this.messageService.add({
                severity: 'error',
                summary: 'Login Error',
                detail: error.message
            });
            this.loadingData = false;
        })
    }
}
