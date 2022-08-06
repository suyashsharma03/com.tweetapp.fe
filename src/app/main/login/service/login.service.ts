import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserLogin } from "../model/login.model";

@Injectable()
export class LoginService {
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
}