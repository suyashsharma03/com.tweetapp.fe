import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as userActions from "../../../main/user/store/user.action";
import * as tweetActions from "../../../main/tweets/store/tweet.action";
import * as fromApp from "../../../store/tweetapp.reducer";
import { Subject, takeUntil } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() isLoggedIn: boolean = false;

  public userName: string;
  public searchForm: FormGroup;
  public isEmailFormatWrong = false;

  private destroy = new Subject<void>();

  constructor(
    private readonly store: Store<fromApp.TweetAppState>,
    private readonly formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initializeSearchForm();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private initializeSearchForm(): void {
    this.searchForm = this.formBuilder.group({
      search: [""]
    });
  }

  public goToResetPassword(): void {
    this.store.dispatch(new userActions.RedirectToResetPassword());
  }

  public goToProfile(): void {
    if(this.isLoggedIn) {
      this.store
        .select(fromApp.AppStates.userState)
        .pipe(takeUntil(this.destroy))
        .subscribe((userState) => {
          this.userName = userState.user.emailId;
        }
      );
      this.store.dispatch(new tweetActions.GetUser(this.userName));
    }
  }

  public searchUsers(): void {
    if(this.isLoggedIn) {
      if(this.searchForm?.value?.search) {
        if(this.checkEmailFormat()) {
          this.store.dispatch(new tweetActions.GetUser(this.searchForm?.value?.search));
          this.isEmailFormatWrong = false;
          this.searchForm.reset();
          this.searchForm.markAsPristine();
        }
        else {
          this.isEmailFormatWrong = true;
        }
      }
    }
  }

  private checkEmailFormat(): boolean {
    const emailString: string = this.searchForm?.value?.search;
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailString)) {
      return true;
    }
    return false;
  }
}
