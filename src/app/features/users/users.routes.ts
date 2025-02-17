import {Routes} from "@angular/router";
import {UsersComponent} from "./users.component";
import {RolesComponent} from "../roles/roles/roles.component";

export const UsersRoutes: Routes = [
    {
        path: '',
        component: UsersComponent
    },
    {
        path: 'roles',
        component: RolesComponent
    }
]
