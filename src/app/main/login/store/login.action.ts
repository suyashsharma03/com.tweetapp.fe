import { Action } from "@ngrx/store";
import { UserDetails, UserLogin } from "../model/login.model";

export enum ActionTypes {
    fetchLogin = "FETCH_LOGIN",
    setLogin = "SET_LOGIN",
    resetLogin = "RESET_LOGIN",
    redirectToHome = "REDIRECT_TO_HOME",
}

export class FetchLogin implements Action {
    readonly type = ActionTypes.fetchLogin;
    constructor(public payload: UserLogin) {}
}

export class SetLogin implements Action {
    readonly type = ActionTypes.setLogin;
    constructor(public payload: UserDetails) {}
}

export class ResetLogin implements Action {
    readonly type = ActionTypes.resetLogin;
}

export class RedirectToHome implements Action {
    readonly type = ActionTypes.redirectToHome;
}

export type LoginActions = 
    | FetchLogin
    | SetLogin
    | ResetLogin;
