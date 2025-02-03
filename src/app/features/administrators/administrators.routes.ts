import {Route, Routes} from "@angular/router";
import {AdministratorsComponent} from "./administrators.component";
import {CreateAdministratorComponent} from "./pages/create-administrator/create-administrator.component";
import {UpdateAdministratorComponent} from "./pages/update-administrator/update-administrator.component";

export const AdministratorsRoutes: Routes = [
    {
        path: '',
        component: AdministratorsComponent
    },
    {
        path: 'create',
        component: CreateAdministratorComponent
    },
    {
        path: 'update/:administratorId',
        component: UpdateAdministratorComponent
    }
]
