import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DefaultPostRequest} from "../../../models/default-post-request";
import {AuthResponse} from "../models/auth-response";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient, private router: Router) {
    }

    login = (request: DefaultPostRequest) =>
        this.http.post<AuthResponse>(environment.apiUrl + '/authentication/login', request)

    register = (request: DefaultPostRequest) =>
        this.http.post<AuthResponse>(environment.apiUrl + '/authentication/register', request)

    resetPassword = (request: DefaultPostRequest) =>
        this.http.post<AuthResponse>(environment.apiUrl + '/authentication/reset-password', request)

    isUserLogged(): boolean {
        const tokenStorageValue = localStorage.getItem('token');

        if (tokenStorageValue === null) {
            return false;
        }

        const decodedToken = jwtDecode(tokenStorageValue) as AuthResponse;

        const now = Date.now().valueOf() / 1000

        if (decodedToken.exp < now) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Log out user from application.
     *
     * @param redirectUrl preferred redirect url.
     */
    logOut(redirectUrl: string): void {
        localStorage.removeItem('token');
        this.router.navigateByUrl(redirectUrl).then();
    }
}
