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
import {RedirectType} from "../../../../enums/redirect-type";
import {HelperService} from "../../../../services/helper.service";
import {MultiSelect} from "primeng/multiselect";
import {Role} from "../../../roles/roles/models/role";
import {RoleService} from "../../../roles/roles/services/role.service";
import {Password} from "primeng/password";
import {EntityType} from "../../../../enums/entity-type";

@Component({
    selector: 'app-user-form',
    imports: [
        ButtonModule,
        InputTextModule,
        CommonModule,
        ReactiveFormsModule,
        MultiSelect,
        Password
    ],
    standalone: true,
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
    @Input() type!: FormType;
    @Input() user!: User;
    @Input() redirectType!: RedirectType;
    @Input() dialogId!: string;
    @Input() returnUrl!: string;

    form!: FormGroup;

    roles!: Role[];

    loadingData = false;

    public get formType(): typeof FormType {
        return FormType;
    }

    constructor(
        public validationService: ValidationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private helperService: HelperService,
        private roleService: RoleService,
        private userService: UserService,
        private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.initForm();
        this.getRoles()
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
            this.createUser() : this.updateUser();
    }

    private initForm = () => this.type == FormType.Create ?
        this.initCreateForm() : this.initUpdateForm();

    private initCreateForm() {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required, Validators.maxLength(50)]],
            password: ['', Validators.required],
            confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
            email: ['', [Validators.required, Validators.maxLength(50)]],
            roles: ['', Validators.required]
        })
    }

    private initUpdateForm() {
        this.form = this.formBuilder.group({
            username: [this.user.username, [Validators.required, Validators.maxLength(50)]],
            email: [this.user.email, [Validators.required, Validators.maxLength(50)]],
            roles: [this.user.roles.map(x => x.id), [Validators.required]]
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
            this.helperService
                .redirectUserAfterSubmit(this.redirectType, this.returnUrl, this.dialogId);

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

    private getRoles() {
        this.roleService.getAllRoles().subscribe((response: Role[]) => {
            this.roles = response.map((x: Role) =>
                Object.assign(new Role(), x)
            );
        })
    }

    private passwordMatchValidator(form: FormGroup) {
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { mismatch: true };
    }
}
