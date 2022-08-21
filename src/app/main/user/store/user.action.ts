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
    redirectToResetPassword = "REDIRECT_TO_RESET_PASSWORD",
    fetchUserDetails = "FETCH_USER_DETAILS",
    setUserDetails = "SET_USER_DETAILS",
    userError = "USER_ERROR",
    userSuccess = "USER_SUCCESS",
    fetchAllUsers = "FETCH_ALL_USERS",
    setUsers = "SET_USERS",
    resetPassword = "RESET_PASSWORD",
    forgotPassword = "FORGOT_PASSWORD",
    forgotResetPassword = "FORGOT_RESET_PASSWORD",
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

export class RedirectToResetPassword implements Action {
    readonly type = ActionTypes.redirectToResetPassword;
    readonly userId?: string;
    constructor(public payload?: string) {
        this.userId = payload;
    }
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

export class ResetPasswordAction implements Action {
    readonly type = ActionTypes.resetPassword;
    readonly reset: ResetPassword;
    public userId: string;
    constructor(public payload: ResetPassword, userId: string) {
        this.reset = payload;
        this.userId = userId;
    }
}

export class ForgotResetPasswordAction implements Action {
    readonly type = ActionTypes.forgotResetPassword;
    readonly reset: ResetPassword;
    public userId: string;
    constructor(public payload: ResetPassword, userId: string) {
        this.reset = payload;
        this.userId = userId;
    }
}

export class ForgotPasswordAction implements Action {
    readonly type = ActionTypes.forgotPassword;
    readonly reset: ForgotPassword;
    constructor(public payload: ForgotPassword) {
        this.reset = payload;
    }
}

export type UserActions = 
    | FetchLogin
    | SetLogin
    | RedirectToRegistration
    | RedirectToLogin
    | RedirectToForgotPassword
    | RedirectToResetPassword
    | FetchUserDetails
    | SetUserDetails
    | ResetLogin
    | UserError
    | UserSuccess
    | FetchAllUsers
    | SetUsers
    | ResetPasswordAction
    | ForgotPasswordAction
    | ForgotResetPasswordAction;
