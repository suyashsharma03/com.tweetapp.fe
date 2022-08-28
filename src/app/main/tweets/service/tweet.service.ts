import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Successful } from "src/app/shared/model/success.model";
import { UserDetails } from "../../user/model/login.model";
import { UserService } from "../../user/service/user.service";
import { ReplyText, Tweet, TweetResponse } from "../model/tweet.model";

@Injectable()
export class TweetService {
    basePath: string;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly userService: UserService
    ) {
        //this.basePath = "http://localhost:48897/api/v1.0/tweets";
        this.basePath = "http://tweetapp.egbvhgbbcecmfzgu.centralindia.azurecontainer.io/api/v1.0/tweets";
    }

    postTweet(userName:string, tweet: Tweet):
    Observable<TweetResponse> {
        const apiUrl = `${this.basePath}/${userName}/add`;
        return this.httpClient.post<TweetResponse>(apiUrl, tweet);
    }
    
    likeUnlikeTweet(userName: string, tweetId: string): Observable<number> {
        const apiUrl = `${this.basePath}/${userName}/like/${tweetId}`;
        return this.httpClient.put<number>(apiUrl, {});
    }

    deleteTweet(tweetId: string): Observable<Successful> {
        const apiUrl = `${this.basePath}/delete/${tweetId}`;
        return this.httpClient.delete<Successful>(apiUrl);
    }

    replyTweet(userName: string, tweetId: string, reply: ReplyText): Observable<boolean> {
        const apiUrl = `${this.basePath}/${userName}/reply/${tweetId}`;
        return this.httpClient.put<boolean>(apiUrl, reply);
    }

    updateTweet(userName: string, tweetId: string, tweet: Tweet):
    Observable<TweetResponse> {
        const apiUrl = `${this.basePath}/${userName}/update/${tweetId}`;
        return this.httpClient.put<TweetResponse>(apiUrl,tweet);
    }

    getTweetById(tweetId: string): Observable<TweetResponse> {
        const apiUrl = `${this.basePath}/tweet/${tweetId}`;
        return this.httpClient.get<TweetResponse>(apiUrl);
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