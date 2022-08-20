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
    Observable<UserDetails> {
        const apiUrl = `${this.basePath}/login`;
        return this.httpClient.post<UserDetails>(apiUrl, userLogin);
    }

    postRegister(userRegistration: UserRegistration):
    Observable<UserRegistration> {
        const apiUrl = `${this.basePath}/register`;
        return this.httpClient.post<UserRegistration>(apiUrl, userRegistration);
    }

    getUser(userName: string): Observable<UserDetails> {
        const apiUrl = `${this.basePath}/user/search/${userName}`;
        return this.httpClient.get<UserDetails>(apiUrl);
    }

    getAllUser(): Observable<UserDetails[]> {
        const apiUrl = `${this.basePath}/users/all`;
        return this.httpClient.get<UserDetails[]>(apiUrl);
    }
}