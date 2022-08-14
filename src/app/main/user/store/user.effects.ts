import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of, switchMap } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
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
    Observable<userActions.SetLogin | userActions.UserError>
    {
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