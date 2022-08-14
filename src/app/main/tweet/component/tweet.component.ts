import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import * as fromApp from "../../../store/tweetapp.reducer";
import * as tweetActions from "../store/tweet.action";
import * as userActions from "../../user/store/user.action";

@Component({
  selector: "app-tweet",
  templateUrl: "./tweet.component.html",
  styleUrls: ["./tweet.component.scss"]
})
export class TweetComponent implements OnInit, OnDestroy {

  public imageSrc: string = "../../../../assets/icons/male_avatar.svg";
  public name: string;

  private destroy = new Subject<void>();
  private gender: string;

  constructor(
    private readonly store: Store<fromApp.TweetAppState>
  ) { }

  ngOnInit(): void {
    this.store
      .select(fromApp.AppStates.userState)
      .pipe(takeUntil(this.destroy))
      .subscribe((userState) => {
        if(userState.user) {
          if(userState.user.token) {
            this.setToStorage(userState.user.token);
            this.name = userState.user.firstName.toUpperCase() + " " + userState.user.lastName.toUpperCase();
            this.gender = userState.user.gender;
            this.getUserDp();
          }
          else {
            this.store.dispatch(new tweetActions.RedirectToUnAuthorized());
            this.clearStorage();
          }
        }
        else {
          this.store.dispatch(new userActions.RedirectToLogin());
          this.clearStorage();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.clearStorage();
  }

  private setToStorage(token: string): void {
    localStorage.setItem("token", token);
    sessionStorage.setItem("token", token);
  }

  private clearStorage(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  getUserDp(): void {
    if(this.gender?.toLowerCase() === "female"){
      this.imageSrc = "../../../../assets/icons/female_avatar.svg";
    }
  }
}
