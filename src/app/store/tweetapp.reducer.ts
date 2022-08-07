import { ActionReducerMap } from "@ngrx/store";
import * as fromLogin from "../main/user/store/user.reducer"

export interface TweetAppState {
    loginState: fromLogin.State;
}

export const tweetAppReducer: ActionReducerMap<TweetAppState> = {
    loginState: fromLogin.reducer,
};

export const enum AppStates {
    loginState = "loginState",
}