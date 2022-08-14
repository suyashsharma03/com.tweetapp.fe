import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { Constants } from "../../../shared/constants/constants";
import * as tweetActions from "./tweet.action";

@Injectable()
export class TweetCreateEffects {

    redirectToUnAuthorized$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(tweetActions.ActionTypes.redirectToUnAuthorized),
                tap(() => {
                    this.router.navigate([Constants.unauthorized]);
                })
            );
        },
        {dispatch: false}
    );

    constructor(
        private readonly actions$: Actions,
        private readonly router: Router
    ){}
}