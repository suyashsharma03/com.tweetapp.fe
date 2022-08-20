import { Injectable, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Constants } from "../../../shared/constants/constants";
import { UserDetails } from "../../user/model/login.model";
import { TweetResponse } from "../model/tweet.model";
import { TweetService } from "../service/tweet.service";
import * as tweetActions from "./tweet.action";

@Injectable()
export class TweetCreateEffects {

    redirectToUnAuthorized$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(tweetActions.ActionTypes.redirectToUnAuthorized),
                tap(() => {
                    this.router.navigate([Constants.unauthorized]);
                })
            );
        },
        {dispatch: false}
    );

    postTweet$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(tweetActions.ActionTypes.createTweet),
                switchMap((input: tweetActions.CreateTweet) =>
                    this.postTweetSwitchMap(input)
                )
            )
        }
    );

    private postTweetSwitchMap(input: tweetActions.CreateTweet):
    Observable<tweetActions.ResponseTweet | tweetActions.TweetError> {
        return this.httpService.postTweet(input.userName, input.payload)
        .pipe(
            map((resData: TweetResponse) => {
                return new tweetActions.ResponseTweet(resData)
            }),
            catchError((error) => this.setErrorMessage(error))
        );
    }

    getAllTweets$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(tweetActions.ActionTypes.fetchTweets),
                switchMap((input: tweetActions.FetchTweets) => 
                    this.getTweetSwitchMap(input)
                )
            )
        }
    );

    private getTweetSwitchMap(input: tweetActions.FetchTweets):
    Observable<tweetActions.SetTweets | tweetActions.TweetError> {
        return this.httpService.getTweets()
        .pipe(
            map((resData: TweetResponse[]) => {
                return new tweetActions.SetTweets(resData)
            }),
            catchError((error) => this.setErrorMessage(error))
        );
    }
    
    getTweet$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(tweetActions.ActionTypes.fetchTweet),
                switchMap((input: tweetActions.FetchTweet) => 
                    this.getUserTweetSwitchMap(input)
                )
            )
        }
    );

    private getUserTweetSwitchMap(input: tweetActions.FetchTweet):
    Observable<tweetActions.SetTweet | tweetActions.TweetError> {
        return this.httpService.getTweet(input.payload)
        .pipe(
            map((resData: TweetResponse[]) => {
                return new tweetActions.SetTweet(resData)
            }),
            catchError((error) => this.setErrorMessage(error))
        );
    }

    getUser$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(tweetActions.ActionTypes.getUser),
                switchMap((input: tweetActions.GetUser) =>
                    this.getUserSwitchMap(input)
                )
            )
        }
    );

    private getUserSwitchMap(input: tweetActions.GetUser):
    Observable<tweetActions.TweetError | tweetActions.SetUser> {
        return this.httpService.getUser(input.payload)
        .pipe(
            map((resData: UserDetails) => {
                return new tweetActions.SetUser(resData)
            }),
            catchError((error) => this.setErrorMessage(error))
        );
    }

    redirectToSubscriber$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(tweetActions.ActionTypes.setUser),
                tap(() => {
                    this.router.navigate([Constants.searchUser]);
                })
            );
        },
        {dispatch: false}
    );

    private setErrorMessage(error): Observable<tweetActions.TweetError> {
        console.log(error);
        return of(new tweetActions.TweetError({
            errorMessage: error?.error?.errors?.TweetText,
        }));
    }

    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly httpService: TweetService
    ){}
}