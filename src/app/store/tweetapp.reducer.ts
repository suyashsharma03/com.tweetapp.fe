import { ActionReducerMap } from "@ngrx/store";
import * as fromUser from "../main/user/store/user.reducer"

export interface TweetAppState {
    userState: fromUser.State;
}

export const tweetAppReducer: ActionReducerMap<TweetAppState> = {
    userState: fromUser.reducer,
};

export const enum AppStates {
    userState = "userState",
}