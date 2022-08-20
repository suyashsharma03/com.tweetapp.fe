import { Action } from "@ngrx/store";
import { Error } from "../../../shared/model/error.model";
import { UserDetails, UserLogin } from "../model/login.model";
import { UserRegistration } from "../model/register.model";

export enum ActionTypes {
    fetchLogin = "FETCH_LOGIN",
    setLogin = "SET_LOGIN",
    resetLogin = "RESET_LOGIN",
    redirectToHome = "REDIRECT_TO_HOME",
    redirectToRegistration = "REDIRECT_TO_REGISTRATION",
    redirectToLogin = "REDIRECT_TO_LOGIN",
    fetchUserDetails = "FETCH_USER_DETAILS",
    setUserDetails = "SET_USER_DETAILS",
    userError = "USER_ERROR",
    fetchAllUsers = "FETCH_ALL_USERS",
    setUsers = "SET_USERS",
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

export class RedirectToRegistration implements Action {
    readonly type = ActionTypes.redirectToRegistration;
}

export class RedirectToLogin implements Action {
    readonly type = ActionTypes.redirectToLogin;
}

export class FetchUserDetails implements Action {
    readonly type = ActionTypes.fetchUserDetails;
    constructor(public payload: UserRegistration) {}
}

export class SetUserDetails implements Action {
    readonly type = ActionTypes.setUserDetails;
    readonly email: string;
    constructor(email: string) {
        this.email = email;
    }
}

export class UserError implements Action {
    readonly type = ActionTypes.userError;
    constructor(public payload: Error) {}
}

export class FetchAllUsers implements Action {
    readonly type = ActionTypes.fetchAllUsers;
}

export class SetUsers implements Action {
    readonly type = ActionTypes.setUsers;
    constructor(public payload: UserDetails[]) {}
}

export type UserActions = 
    | FetchLogin
    | SetLogin
    | RedirectToRegistration
    | RedirectToLogin
    | FetchUserDetails
    | SetUserDetails
    | ResetLogin
    | UserError
    | FetchAllUsers
    | SetUsers;
