import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, switchMap } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Constants } from "../../../shared/constants/constants";
import { UserService } from "../service/user.service";
import * as userActions from "./user.action";

@Injectable()
export class UserCreateEffects {

    redirectToHome$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(userActions.ActionTypes.redirectToHome),
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
                    this.router.navigate([Constants.registerationPage]);
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
    Observable<userActions.RedirectToHome> {
        return this.httpService.postLogin(input.payload).pipe(
            map(() => {
                return new userActions.RedirectToHome();
            })
        );
    }

    constructor(
        private readonly actions$: Actions,
        private readonly httpService: UserService,
        private readonly router: Router
    ){}
}