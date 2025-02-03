import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {Table, TableModule} from "primeng/table";
import {User} from "../users/models/user";
import {UserService} from "../users/services/user.service";
import {Administrator} from "./models/administrator";
import {AdministratorService} from "./services/administrator.service";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-administrators',
    imports: [
        ButtonDirective,
        IconField,
        InputIcon,
        InputText,
        TableModule,
        Button,
        RouterLink
    ],
    standalone: true,
    templateUrl: './administrators.component.html',
    styleUrl: './administrators.component.scss'
})
export class AdministratorsComponent {
    @Input() administrators!: Administrator[];

    @ViewChild(`filter`) filter!: ElementRef;

    constructor(private administratorService: AdministratorService) {
    }

    ngOnInit(): void {
        this.administratorService.getAllAdministrators().subscribe((response: Administrator[]) => {
            this.administrators = response.map((x: Administrator) =>
                Object.assign(new Administrator(), x)
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
}
