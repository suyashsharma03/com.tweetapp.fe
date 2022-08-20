import { ActionReducerMap } from "@ngrx/store";
import * as fromUser from "../main/user/store/user.reducer"
import * as fromTweet from "../main/tweets/store/tweet.reducer"

export interface TweetAppState {
    userState: fromUser.State;
    tweetState: fromTweet.State;
}

export const tweetAppReducer: ActionReducerMap<TweetAppState> = {
    userState: fromUser.reducer,
    tweetState: fromTweet.reducer,
};

export const enum AppStates {
    userState = "userState",
    tweetState = "tweetState",
}