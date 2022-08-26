import { Successful } from "src/app/shared/model/success.model";
import { Error } from "../../../shared/model/error.model";
import { UserDetails } from "../../user/model/login.model";
import { Tweet, TweetResponse } from "../model/tweet.model";
import * as tweetActons from "./tweet.action";

export interface State {
    tweet: Tweet;
    tweetResponse: TweetResponse;
    tweetById: TweetResponse;
    tweets: TweetResponse[];
    userName: string;
    error: Error,
    user: UserDetails,
    userTweets: TweetResponse[],
    likes: number,
    replySuccessful: boolean,
    success: Successful,
    isEdit: boolean,
    tweetId: string;
}

export const initialState: State = {
    tweet: null,
    tweetResponse: null,
    tweetById: null,
    tweets: null,
    userName: null,
    error: null,
    user: null,
    userTweets: null,
    likes: null,
    replySuccessful: null,
    success: null,
    isEdit: null,
    tweetId: null,
}

export function reducer(
    state: State,
    action: tweetActons.TweetActions
): State {
    if (!state) {
        state = initialState;
    }
    switch(action.type) {
        case tweetActons.ActionTypes.createTweet:
            return { ...state, tweet: action.payload, userName: action.userName };
        case tweetActons.ActionTypes.responseTweet:
            return { ...state, tweetResponse: action.payload };
        case tweetActons.ActionTypes.setLikes:
            return { ...state, likes: action.payload };
        case tweetActons.ActionTypes.setTweetById:
            return { ...state, tweetById: action.payload };
        case tweetActons.ActionTypes.getTweetById:
            return { ...state, isEdit: action.isEdit, tweetId: action.tweetId };
        default:
            return dividingReducerForComplexity(state, action);   
    }
}

export function dividingReducerForComplexity(
    state: State,
    action: tweetActons.TweetActions
): State {
    if (!state) {
        state = initialState;
    }
    switch(action.type) {
        case tweetActons.ActionTypes.setTweets:
            return { ...state, tweets: action.payload };
        case tweetActons.ActionTypes.setTweet:
            return { ...state, userTweets: action.payload };
        case tweetActons.ActionTypes.setUser:
            return { ...state, user: action.payload };
        default:
            return errorSuccessResetReducer(state, action);
    }
}

export function errorSuccessResetReducer(
    state: State,
    action: tweetActons.TweetActions
): State {
    switch(action.type) {
        case tweetActons.ActionTypes.replySuccessful:
            return { ...state, replySuccessful: action.payload };
        case tweetActons.ActionTypes.tweetSuccess:
            return { ...state, success: action.payload };
        case tweetActons.ActionTypes.tweetError:
            return { ...state, error: action.payload };
        case tweetActons.ActionTypes.resetTweet:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}