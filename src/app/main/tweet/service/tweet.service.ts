import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tweet, TweetResponse } from "../model/tweet.model";

@Injectable()
export class TweetService {
    basePath: string;

    constructor(
        private readonly httpClient: HttpClient
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
}