import { UserDetails, UserLogin } from "../model/login.model";
import { UserRegistration } from "../model/register.model";
import * as userActions from "./user.action";

export interface State {
    user: UserDetails;
    userLogin: UserLogin;
    userRegistration: UserRegistration;
    email: string;
}

export const initialState: State = {
    user: null,
    userLogin: null,
    userRegistration: null,
    email: null
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
        case userActions.ActionTypes.fetchUserDetails:
            return { ...state, userRegistration: action.payload };
        case userActions.ActionTypes.setUserDetails:
            return { ...state, email: action.email };
        case userActions.ActionTypes.resetLogin:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}