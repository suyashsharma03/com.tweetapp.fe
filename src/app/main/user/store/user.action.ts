import { Action } from "@ngrx/store";
import { Successful } from "src/app/shared/model/success.model";
import { Error } from "../../../shared/model/error.model";
import { ResetPassword, ForgotPassword, UserDetails, UserLogin } from "../model/login.model";
import { UserRegistration } from "../model/register.model";

export enum ActionTypes {
    fetchLogin = "FETCH_LOGIN",
    setLogin = "SET_LOGIN",
    resetLogin = "RESET_LOGIN",
    redirectToHome = "REDIRECT_TO_HOME",
    redirectToRegistration = "REDIRECT_TO_REGISTRATION",
    redirectToLogin = "REDIRECT_TO_LOGIN",
    redirectToForgotPassword = "REDIRECT_TO_FORGOT_PASSWORD",
    fetchUserDetails = "FETCH_USER_DETAILS",
    setUserDetails = "SET_USER_DETAILS",
    userError = "USER_ERROR",
    userSuccess = "USER_SUCCESS",
    fetchAllUsers = "FETCH_ALL_USERS",
    setUsers = "SET_USERS",
    forgotPassword = "FORGOT_PASSWORD",
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

export class RedirectToForgotPassword implements Action {
    readonly type = ActionTypes.redirectToForgotPassword;
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

export class UserSuccess implements Action {
    readonly type = ActionTypes.userSuccess;
    constructor(public payload: Successful) {}
}

export class FetchAllUsers implements Action {
    readonly type = ActionTypes.fetchAllUsers;
}

export class SetUsers implements Action {
    readonly type = ActionTypes.setUsers;
    constructor(public payload: UserDetails[]) {}
}

export class ForgetPassword implements Action {
    readonly type = ActionTypes.forgotPassword;
    readonly forgot: ResetPassword;
    public userId: string;
    constructor(public payload: ResetPassword, userId: string) {
        this.forgot = payload;
        this.userId = userId;
    }
}

export type UserActions = 
    | FetchLogin
    | SetLogin
    | RedirectToRegistration
    | RedirectToLogin
    | RedirectToForgotPassword
    | FetchUserDetails
    | SetUserDetails
    | ResetLogin
    | UserError
    | UserSuccess
    | FetchAllUsers
    | SetUsers
    | ForgetPassword;
