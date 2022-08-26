import { Action } from "@ngrx/store";
import { Successful } from "../../../shared/model/success.model";
import { Error } from "../../../shared/model/error.model";
import { UserDetails } from "../../user/model/login.model";
import { ReplyText, Tweet, TweetResponse } from "../model/tweet.model";

export enum ActionTypes {
    redirectToUnAuthorized = "REDIRECT_TO_UNAUTHORIZED",
    resetTweet = "RESET_TWEET",
    createTweet = "CREATE_TWEET",
    responseTweet = "RESPONSE_TWEET",
    tweetError = "TWEET_ERROR",
    fetchTweets = "FETCH_TWEETS",
    setTweets = "SET_TWEETS",
    getUser = "GET_USER",
    setUser = "SET_USER",
    fetchTweet = "FETCH_TWEET",
    setTweet = "SET_TWEET",
    likeUnlikeTweet = "LIKE_UNLIKE_TWEET",
    replyTweet = "REPLY_TWEET",
    updateTweet = "UPDATE_TWEET",
    deleteTweet = "DELETE_TWEET",
    setLikes = "SET_LIKES",
    replySuccessful = "REPLY_SUCCESSFUL",
    tweetSuccess = "TWEET_SUCCESS",
    goToRefresh = "GOTO_REFRESH",
    redirectToModify = "REDIRECT_TO_MODIFY",
    getTweetById = "GET_TWEET_BY_ID",
    setTweetById = "SET_TWEET_BY_ID",
}

export class ResetTweet implements Action {
    readonly type = ActionTypes.resetTweet;
}

export class RedirectToUnAuthorized implements Action {
    readonly type = ActionTypes.redirectToUnAuthorized;
}

export class GotoRefresh implements Action {
    readonly type = ActionTypes.goToRefresh;
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

export class ResponseTweet implements Action {
    readonly type = ActionTypes.responseTweet;
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

export class FetchTweet implements Action {
    readonly type = ActionTypes.fetchTweet;
    readonly payload: string;
    constructor(userName: string) {
        this.payload = userName;
    }
}

export class SetTweet implements Action {
    readonly type = ActionTypes.setTweet;
    constructor(public payload: TweetResponse[]) {}
}

export class GetUser implements Action {
    readonly type = ActionTypes.getUser;
    readonly payload: string;
    constructor(userName: string) {
        this.payload = userName;
    }
}

export class SetUser implements Action {
    readonly type = ActionTypes.setUser;
    constructor(public payload: UserDetails) {}
}

export class LikeUnlikeTweet implements Action {
    readonly type = ActionTypes.likeUnlikeTweet;
    readonly userName: string;
    readonly tweetId: string;
    constructor(userName: string, tweetId: string) {
        this.userName = userName;
        this.tweetId = tweetId;
    }
}

export class SetLikes implements Action {
    readonly type = ActionTypes.setLikes;
    constructor(public payload: number) {}
}

export class ReplyTweet implements Action {
    readonly type = ActionTypes.replyTweet;
    readonly userName: string;
    readonly tweetId: string;
    constructor(public payload: ReplyText, userName: string, tweetId: string) {
        this.userName = userName;
        this.tweetId = tweetId;
    }
}

export class ReplySuccessful implements Action {
    readonly type = ActionTypes.replySuccessful;
    constructor(public payload: boolean) {}
}

export class UpdateTweet implements Action {
    readonly type = ActionTypes.updateTweet;
    readonly userName: string;
    readonly tweetId: string;
    constructor(public payload: Tweet, userName: string, tweetId: string) {
        this.userName = userName;
        this.tweetId = tweetId;
    }
}

export class DeleteTweet implements Action {
    readonly type = ActionTypes.deleteTweet;
    readonly tweetId: string;
    constructor(tweetId: string) {
        this.tweetId = tweetId;
    }
}

export class TweetSuccess implements Action {
    readonly type = ActionTypes.tweetSuccess;
    constructor(public payload: Successful) {}
}

export class RedirectToModify implements Action {
    readonly type = ActionTypes.redirectToModify;
}

export class GetTweetById implements Action {
    readonly type = ActionTypes.getTweetById;
    readonly tweetId: string;
    readonly isEdit: boolean;
    constructor(tweetId: string, isEdit: boolean) {
        this.tweetId = tweetId;
        this.isEdit = isEdit;
    }
}

export class SetTweetById implements Action {
    readonly type = ActionTypes.setTweetById;
    constructor(public payload: TweetResponse) {}
}

export type TweetActions = 
    | ResetTweet
    | RedirectToUnAuthorized
    | CreateTweet
    | ResponseTweet
    | TweetError
    | FetchTweets
    | SetTweets
    | GetUser
    | SetUser
    | FetchTweet
    | SetTweet
    | LikeUnlikeTweet
    | SetLikes
    | ReplyTweet
    | ReplySuccessful
    | UpdateTweet
    | DeleteTweet
    | TweetSuccess
    | GotoRefresh
    | RedirectToModify
    | GetTweetById
    | SetTweetById;