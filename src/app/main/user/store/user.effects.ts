import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of, switchMap } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Successful } from "src/app/shared/model/success.model";
import { Constants } from "../../../shared/constants/constants";
import { UserDetails } from "../model/login.model";
import { UserService } from "../service/user.service";
import * as userActions from "./user.action";

@Injectable()
export class UserCreateEffects {

    redirectToHome$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(userActions.ActionTypes.setLogin),
                tap(() => {
                    this.router.navigate([Constants.homePage]);
                })
            );
        },
        {dispatch: false}
    );

    redirectToRegistration$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(userActions.ActionTypes.redirectToRegistration),
                tap(() => {
                    this.router.navigate([Constants.registrationPage]);
                })
            );
        },
        {dispatch: false}
    );

    redirectToLogin$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(userActions.ActionTypes.redirectToLogin),
                tap(() => {
                    this.router.navigate([Constants.loginPage]);
                })
            );
        },
        {dispatch: false}
    );

    redirectToForgotPassword$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(userActions.ActionTypes.redirectToForgotPassword),
                tap(() => {
                    this.router.navigate([Constants.forgotPassword]);
                })
            );
        },
        {dispatch: false}
    );

    redirectToResetPassword$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(userActions.ActionTypes.redirectToResetPassword),
                tap(() => {
                    this.router.navigate([Constants.resetPassword]);
                })
            );
        },
        {dispatch: false}
    );

    doLogin$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(userActions.ActionTypes.fetchLogin),
                switchMap((input: userActions.FetchLogin) =>
                    this.doLoginSwitchMap(input)
                )
            )
        }
    );

    private doLoginSwitchMap(input : userActions.FetchLogin):
    Observable<userActions.SetLogin | userActions.UserError> {
        return this.httpService
        .postLogin(input.payload)
        .pipe(
            map((resData: UserDetails) => {
                return new userActions.SetLogin(resData);
            }),
            catchError((error) => this.setErrorMessage(error))
        );
    }

    doRegister$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(userActions.ActionTypes.fetchUserDetails),
                switchMap((input: userActions.FetchUserDetails) =>
                    this.doRegisterSwitchMap(input)
                )
            )
        }
    );

    private doRegisterSwitchMap(input: userActions.FetchUserDetails):
    Observable<userActions.UserError | userActions.RedirectToLogin> {
        return this.httpService.postRegister(input.payload).pipe(
            map(() => {
                return new userActions.RedirectToLogin();
            }),
            catchError((error) => this.setErrorMessage(error))
        );
    }

    searchAllUsers$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(userActions.ActionTypes.fetchAllUsers),
                switchMap((input: userActions.FetchAllUsers) =>
                    this.searchAllUserSwitchMap(input)
                )
            )
        }
    );

    private searchAllUserSwitchMap(input: userActions.FetchAllUsers):
    Observable<userActions.UserError | userActions.SetUsers> {
        return this.httpService.getAllUser().pipe(
            map((resData: UserDetails[]) => {
                return new userActions.SetUsers(resData);
            }),
            catchError((error) => this.setErrorMessage(error))
        );
    }

    resetPaswword$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(userActions.ActionTypes.resetPassword),
                switchMap((input: userActions.ResetPasswordAction) =>
                    this.resetPasswordSwitchMap(input)
                )
            )
        }
    );

    private resetPasswordSwitchMap(input: userActions.ResetPasswordAction):
    Observable<userActions.UserError | userActions.UserSuccess> {
        return this.httpService.resetPassword(input.userId, input.payload).pipe(
            map((resData: Successful) => {
                return new userActions.UserSuccess(resData);
            }),
            catchError((error) => this.setErrorMessage(error))
        );
    }

    forgotResetPaswword$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(userActions.ActionTypes.forgotResetPassword),
                switchMap((input: userActions.ForgotResetPasswordAction) =>
                    this.forgotResetPasswordSwitchMap(input)
                )
            )
        }
    );

    private forgotResetPasswordSwitchMap(input: userActions.ForgotResetPasswordAction):
    Observable<userActions.UserError | userActions.UserSuccess> {
        return this.httpService.forgotResetPassword(input.userId, input.payload).pipe(
            map((resData: Successful) => {
                return new userActions.UserSuccess(resData);
            }),
            catchError((error) => this.setErrorMessage(error))
        );
    }

    forgotPassword$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(userActions.ActionTypes.forgotPassword),
                switchMap((input: userActions.ForgotPasswordAction) =>
                    this.forgotPasswordSwitchMap(input)
                )
            )
        }
    );

    private forgotPasswordSwitchMap(input: userActions.ForgotPasswordAction) {
        return this.httpService.forgotPassword(input.payload).pipe(
            map(() => {
                return new userActions.RedirectToResetPassword(input.payload.emailId);
            }),
            catchError((error) => this.setErrorMessage(error))
        );
    }

    private setErrorMessage(error): Observable<userActions.UserError> {
        console.log(error);
        return of(new userActions.UserError({
            errorMessage: error.error.errorMessage
        }));
    }

    constructor(
        private readonly actions$: Actions,
        private readonly httpService: UserService,
        private readonly router: Router
    ){}
}