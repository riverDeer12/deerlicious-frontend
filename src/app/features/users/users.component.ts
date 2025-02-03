import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {Table, TableModule} from "primeng/table";
import {User} from "./models/user";
import {UserService} from "./services/user.service";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-users',
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
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent {
    @Input() users!: User[];

    @ViewChild(`filter`) filter!: ElementRef;

    constructor(private userService: UserService) {
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
}
