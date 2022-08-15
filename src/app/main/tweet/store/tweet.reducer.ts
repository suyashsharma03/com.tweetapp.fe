import { Error } from "../../../shared/model/error.model";
import { Tweet, TweetResponse } from "../model/tweet.model";
import * as tweetActons from "./tweet.action";

export interface State {
    tweet: Tweet;
    tweetResponse: TweetResponse;
    tweets: TweetResponse[];
    userName: string;
    error: Error
}

export const initialState: State = {
    tweet: null,
    tweetResponse: null,
    tweets: null,
    userName: null,
    error: null
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
        case tweetActons.ActionTypes.setTweet:
            return { ...state, tweetResponse: action.payload };
        case tweetActons.ActionTypes.tweetError:
            return { ...state, error: action.payload };
        case tweetActons.ActionTypes.setTweets:
            return { ...state, tweets: action.payload };
        case tweetActons.ActionTypes.resetTweet:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}