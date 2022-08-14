import { Action } from "@ngrx/store";

export enum ActionTypes {
    redirectToUnAuthorized = "REDIRECT_TO_UNAUTHORIZED",
    resetTweet = "RESET_TWEET"
}

export class ResetTweet implements Action {
    readonly type = ActionTypes.resetTweet;
}

export class RedirectToUnAuthorized implements Action {
    readonly type = ActionTypes.redirectToUnAuthorized;
}

export type TweetActions = 
    | ResetTweet
    | RedirectToUnAuthorized;
