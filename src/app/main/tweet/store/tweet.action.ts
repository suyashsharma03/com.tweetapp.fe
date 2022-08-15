import { Action } from "@ngrx/store";
import { Error } from "../../../shared/model/error.model";
import { Tweet, TweetResponse } from "../model/tweet.model";

export enum ActionTypes {
    redirectToUnAuthorized = "REDIRECT_TO_UNAUTHORIZED",
    resetTweet = "RESET_TWEET",
    createTweet = "CREATE_TWEET",
    setTweet = "SET_TWEET",
    tweetError = "TWEET_ERROR",
    fetchTweets = "FETCH_TWEETS",
    setTweets = "SET_TWEETS",
}

export class ResetTweet implements Action {
    readonly type = ActionTypes.resetTweet;
}

export class RedirectToUnAuthorized implements Action {
    readonly type = ActionTypes.redirectToUnAuthorized;
}

export class CreateTweet implements Action {
    readonly type = ActionTypes.createTweet;
    readonly userName: string;
    constructor(
        public payload: Tweet,
        userName: string
    ) {
        this.userName = userName;
    }
}

export class SetTweet implements Action {
    readonly type = ActionTypes.setTweet;
    constructor(public payload: TweetResponse) {}
}

export class TweetError implements Action {
    readonly type = ActionTypes.tweetError;
    constructor(public payload: Error) {}
}

export class FetchTweets implements Action {
    readonly type = ActionTypes.fetchTweets;
}

export class SetTweets implements Action {
    readonly type = ActionTypes.setTweets;
    constructor(public payload: TweetResponse[]) {}
}

export type TweetActions = 
    | ResetTweet
    | RedirectToUnAuthorized
    | CreateTweet
    | SetTweet
    | TweetError
    | FetchTweets
    | SetTweets;
