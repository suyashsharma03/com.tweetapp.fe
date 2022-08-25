import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as userActions from "../../../main/user/store/user.action";
import * as fromApp from "../../../store/tweetapp.reducer";

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {

  constructor(
    private readonly store: Store<fromApp.TweetAppState>
  ) { }

  public login(): void {
    this.store.dispatch(new userActions.RedirectToLogin());
  }

}
