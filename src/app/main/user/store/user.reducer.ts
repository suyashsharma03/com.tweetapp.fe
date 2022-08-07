import { UserDetails, UserLogin } from "../model/login.model";
import * as userActions from "./user.action";

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
    action: userActions.UserActions
): State {
    if (!state) {
        state = initialState;
    }
    switch(action.type) {
        case userActions.ActionTypes.fetchLogin:
            return { ...state, userLogin: action.payload };
        case userActions.ActionTypes.setLogin:
            return { ...state, user: action.payload };
        case userActions.ActionTypes.resetLogin:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}