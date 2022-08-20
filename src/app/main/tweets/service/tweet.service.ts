import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDetails } from "../../user/model/login.model";
import { UserService } from "../../user/service/user.service";
import { Tweet, TweetResponse } from "../model/tweet.model";

@Injectable()
export class TweetService {
    basePath: string;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly userService: UserService
    ) {
        this.basePath = "http://localhost:48897/api/v1.0/tweets";
    }

    postTweet(userName:string, tweet: Tweet):
    Observable<TweetResponse> {
        const apiUrl = `${this.basePath}/${userName}/add`;
        return this.httpClient.post<TweetResponse>(apiUrl, tweet);
    }

    getTweets(): Observable<TweetResponse[]> {
        const apiUrl = `${this.basePath}/all`;
        return this.httpClient.get<TweetResponse[]>(apiUrl);
    }

    getTweet(userName: string): Observable<TweetResponse[]> {
        const apiUrl = `${this.basePath}/${userName}`;
        return this.httpClient.get<TweetResponse[]>(apiUrl);
    }

    getUser(userName: string): Observable<UserDetails> {
        return this.userService.getUser(userName);
    }
}