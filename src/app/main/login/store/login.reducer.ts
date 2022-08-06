import { UserDetails, UserLogin } from "../model/login.model";
import * as loginActions from "./login.action";

export interface State {
    user: UserDetails;
    userLogin: UserLogin
}

export const initialState: State = {
    user: null,
    userLogin: null,
}

export function reducer(
    state: State,
    action: loginActions.LoginActions
): State {
    if (!state) {
        state = initialState;
    }
    switch(action.type) {
        case loginActions.ActionTypes.fetchLogin:
            return { ...state, userLogin: action.payload };
        case loginActions.ActionTypes.setLogin:
            return { ...state, user: action.payload };
        case loginActions.ActionTypes.resetLogin:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}