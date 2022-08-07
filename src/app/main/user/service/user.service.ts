import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDetails, UserLogin } from "../model/login.model";
import { UserRegistration } from "../model/register.model";

@Injectable()
export class UserService {
    basePath: string;

    constructor(
        private readonly httpClient: HttpClient
    ) {
        this.basePath = "http://localhost:48897/api/v1.0/tweets";
    }

    postLogin(userLogin: UserLogin):
    Observable<UserLogin> {
        const apiUrl = `${this.basePath}/login`;
        return this.httpClient.post<UserLogin>(apiUrl, userLogin);
    }

    postRegister(userRegistration: UserRegistration):
    Observable<UserRegistration> {
        const apiUrl = `${this.basePath}/register`;
        return this.httpClient.post<UserRegistration>(apiUrl, userRegistration);
    }
}