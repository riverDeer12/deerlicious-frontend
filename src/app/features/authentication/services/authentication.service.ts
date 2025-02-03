import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DefaultPostRequest} from "../../../models/default-post-request";
import {AuthResponse} from "../models/auth-response";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    login = (request: DefaultPostRequest) =>
        this.http.post<AuthResponse>(environment.apiUrl + '/authentication/login', request)

    register = (request: DefaultPostRequest) =>
        this.http.post<AuthResponse>(environment.apiUrl + '/authentication/register', request)

    resetPassword = (request: DefaultPostRequest) =>
        this.http.post<AuthResponse>(environment.apiUrl + '/authentication/reset-password', request)
}
