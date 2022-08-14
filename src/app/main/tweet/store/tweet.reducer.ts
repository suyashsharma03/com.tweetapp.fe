import * as tweetActons from "./tweet.action";

export interface State {

}

export const initialState: State = {

}

export function reducer(
    state: State,
    action: tweetActons.TweetActions
): State {
    if (!state) {
        state = initialState;
    }
    switch(action.type) {
        case tweetActons.ActionTypes.resetTweet:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}