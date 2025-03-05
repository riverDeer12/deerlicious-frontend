import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../features/authentication/services/authentication.service";

export const AdminGuard: CanActivateFn = (route, state) => {
    const authenticationService = inject(AuthenticationService);
    const router = inject(Router);


    if(!authenticationService.isUserLogged()){
        router.navigateByUrl('authentication/login').then();
        return;
    }


};
