import {Component, Input} from '@angular/core';
import {FormType} from "../../../../../enums/form-type";
import {RedirectType} from "../../../../../enums/redirect-type";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ValidationService} from "../../../../../services/validation.service";
import {Router} from "@angular/router";
import {HelperService} from "../../../../../services/helper.service";
import {MessageService} from "primeng/api";
import {Role} from "../../models/role";
import {RoleService} from "../../services/role.service";
import {Button} from "primeng/button";
import {InputText} from "primeng/inputtext";
import {MultiSelect} from "primeng/multiselect";
import {Permission} from "../../models/permission";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-role-form',
    imports: [
        CommonModule,
        Button,
        FormsModule,
        InputText,
        ReactiveFormsModule,
        MultiSelect
    ],
    standalone: true,
    templateUrl: './role-form.component.html',
    styleUrl: './role-form.component.scss'
})
export class RoleFormComponent {
    @Input() type!: FormType;
    @Input() role!: Role;
    @Input() redirectType!: RedirectType;
    @Input() dialogId!: string;
    @Input() returnUrl!: string;

    form!: FormGroup;

    loadingData = false;

    permissions!: Permission[];

    constructor(
        public validationService: ValidationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private helperService: HelperService,
        private roleService: RoleService,
        private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.initForm();
        this.getPermissions();
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
            this.createRole() : this.updateRole();
    }

    private initForm = () => this.type == FormType.Create ?
        this.initCreateForm() : this.initUpdateForm();

    private initCreateForm() {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            permissions: ['', [Validators.required]]
        })
    }

    private initUpdateForm() {
        this.form = this.formBuilder.group({
            name: [this.role.name, [Validators.required, Validators.maxLength(50)]],
            permissions: [this.role.permissions, [Validators.required]],
        })
    }

    private createRole() {
        this.roleService.createRole(this.form.value).subscribe((response: Role) => {
            this.role = Object.assign(response as Role);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Role is Created Successfully.'
            });
            this.helperService
                .redirectUserAfterSubmit(this.redirectType, this.returnUrl, this.dialogId);

            this.loadingData = false;
        }, error => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Creating Role',
                detail: error.message
            });
            this.loadingData = false;
        })
    }

    private updateRole() {
        this.roleService.updateRole(this.role.id, this.form.value).subscribe((response: Role) => {
            this.role = Object.assign(response as Role);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Role is Updated Successfully.'
            });
            this.loadingData = false;
        }, error => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Updating Role',
                detail: error.message
            });
            this.loadingData = false;
        })
    }

    private getPermissions() {
        this.roleService.getAllPermissions().subscribe((response: Permission[]) => {
            this.permissions = response.map((x: Permission) =>
                Object.assign(new Permission(), x)
            );
        })
    }
}
