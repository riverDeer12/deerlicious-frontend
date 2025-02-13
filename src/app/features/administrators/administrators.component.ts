import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { Administrator } from './models/administrator';
import { AdministratorService } from './services/administrator.service';
import { RouterLink } from '@angular/router';
import { DialogFormComponent } from '../../components/dialog-form/dialog-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-administrators',
    imports: [ButtonDirective, IconField, InputIcon, InputText, TableModule, Button, RouterLink],
    standalone: true,
    providers: [DialogService, ConfirmationService, MessageService],
    templateUrl: './administrators.component.html',
    styleUrl: './administrators.component.scss'
})
export class AdministratorsComponent {
    @Input() administrators!: Administrator[];

    @ViewChild(`filter`) filter!: ElementRef;

    constructor(private administratorService: AdministratorService,
                private dialogService: DialogService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService) {}

    ngOnInit(): void {
        this.administratorService.getAllAdministrators().subscribe((response: Administrator[]) => {
            this.administrators = response.map((x: Administrator) => Object.assign(new Administrator(), x));
        });
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
            header: 'Add New Administrator',
            width: '50vw',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            }
        });
    }

    openInfoDialog(administrator: Administrator) {
        this.dialogService.open(DialogFormComponent, {
            header: 'Details for ' + administrator.lastName,
            width: '50vw',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            }
        });
    }

    openUpdateDialog(administrator: Administrator) {
        this.dialogService.open(DialogFormComponent, {
            header: 'Update data for ' + administrator.lastName,
            width: '50vw',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            }
        });
    }

    confirmDelete(administrator: Administrator) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this administrator?',
            header: 'Confirm deletion of ' + administrator.lastName,
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
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Recipe has been deleted.' });
            }
        });
    }
}
