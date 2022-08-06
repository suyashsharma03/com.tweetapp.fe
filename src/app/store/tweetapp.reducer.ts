import { ActionReducerMap } from "@ngrx/store";
import * as fromLogin from "../main/login/store/login.reducer"

export interface TweetAppState {
    loginState: fromLogin.State;
}

export const tweetAppReducer: ActionReducerMap<TweetAppState> = {
    loginState: fromLogin.reducer,
};

export const enum AppStates {
    loginState = "loginState",
}