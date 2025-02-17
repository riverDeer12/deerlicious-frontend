import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {AppMenuitem} from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}]
            },
            {
                label: 'Administrators',
                items: [{label: 'List of Administrators', icon: 'pi pi-fw pi-users', routerLink: ['/administrators']}]
            },
            {
                label: 'Categories',
                items: [{label: 'List of Categories', icon: 'pi pi-fw pi-bookmark', routerLink: ['/categories']}]
            },
            {
                label: 'Recipes',
                items: [{label: 'List of Recipes', icon: 'pi pi-fw pi-book', routerLink: ['/recipes']}]
            },
            {
                label: 'Users',
                items: [
                    {
                        label: 'List of Users', icon: 'pi pi-fw pi-users', routerLink: ['/users']
                    },
                    {
                        label: 'List of Roles', icon: 'pi pi-fw pi-crown', routerLink: ['/users/roles']
                    }
                ]
            }
        ];
    }
}
