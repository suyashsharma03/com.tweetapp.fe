import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as userActions from "../../../main/user/store/user.action";
import * as fromApp from "../../../store/tweetapp.reducer";

@Component({
  selector: "app-refresh",
  templateUrl: "./refresh.component.html",
  styleUrls: ["./refresh.component.scss"]
})
export class RefreshComponent implements OnInit {

  constructor(
    private readonly store: Store<fromApp.TweetAppState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new userActions.RedirectToHome());
  }

}
