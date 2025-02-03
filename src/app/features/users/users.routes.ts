import {Routes} from "@angular/router";
import {UsersComponent} from "./users.component";
import {CreateUserComponent} from "./pages/create-user/create-user.component";
import {UpdateUserComponent} from "./pages/update-user/update-user.component";

export const UsersRoutes: Routes = [
    {
        path: '',
        component: UsersComponent
    },
    {
        path: 'create',
        component: CreateUserComponent
    },
    {
        path: 'update/:userId',
        component: UpdateUserComponent
    }
]
