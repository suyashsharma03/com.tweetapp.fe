import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, switchMap } from "rxjs";
import { LoginService } from "../service/login.service";
import * as loginActions from "./login.action";
import { catchError, map, tap } from "rxjs/operators";

@Injectable()
export class LoginCreateEffects {

    redirectToHome$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loginActions.ActionTypes.redirectToHome),
                tap(() => {
                    this.router.navigate[("/home")];
                })
            );
        },
        {dispatch: false}
    );

    doLogin$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loginActions.ActionTypes.fetchLogin),
                switchMap((input: loginActions.FetchLogin) =>
                    this.doLoginSwitchMap(input)
                )
            )
        }
    );

    private doLoginSwitchMap(input : loginActions.FetchLogin): 
    Observable<loginActions.RedirectToHome> {
        return this.httpService.postLogin(input.payload).pipe(
            map(() => {
                return new loginActions.RedirectToHome();
            })
        );
    }

    constructor(
        private readonly actions$: Actions,
        private readonly httpService: LoginService,
        private readonly router: Router
    ){}
}