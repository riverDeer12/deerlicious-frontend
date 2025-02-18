import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {Table, TableModule} from "primeng/table";
import {User} from "./models/user";
import {UserService} from "./services/user.service";
import {DatePipe} from "@angular/common";
import {DialogFormComponent} from "../../components/dialog-form/dialog-form.component";
import {EntityType} from "../../enums/entity-type";
import {FormType} from "../../enums/form-type";
import {DialogInfoComponent} from "../../components/dialog-info/dialog-info.component";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
    selector: 'app-users',
    imports: [
        ButtonDirective,
        IconField,
        InputIcon,
        InputText,
        TableModule,
        Button,
        DatePipe
    ],
    standalone: true,
    providers:[
        DialogService
    ],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent {
    @Input() users!: User[];

    @ViewChild(`filter`) filter!: ElementRef;

    constructor(private userService: UserService,
                private dialogService: DialogService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.userService.getAllUsers().subscribe((response: User[]) => {
            this.users = response.map((x: User) =>
                Object.assign(new User(), x)
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
            header: 'Add New User',
            data: {
                contentType: EntityType.User,
                formType: FormType.Create
            }
        });
    }

    openInfoDialog(user: User) {
        this.dialogService.open(DialogInfoComponent, {
            header: 'Details for: ' + user.id,
            data: {
                contentType: EntityType.User,
                data: user
            }
        });
    }

    openUpdateDialog(user: User) {
        this.dialogService.open(DialogFormComponent, {
            header: 'Update data for: ' + user.id,
            data: {
                contentType: EntityType.User,
                formType: FormType.Update,
                data: user
            }
        });
    }

    confirmDelete(user: User) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to deactivate this user?',
            header: 'Confirm deletion of ' + user.id,
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
                this.userService.deleteUser(user.id)
                    .subscribe(() => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'User has been deactivated.'
                        });
                    }, () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Error deactivating user.'
                        });
                    });
            }
        });
    }
}
