import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import * as fromApp from "../../../../store/tweetapp.reducer";
import * as tweetActions from "../../store/tweet.action";
import * as userActions from "../../../user/store/user.action";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ValidationService } from "../../../../shared/services/validation.service";
import { Tweet } from "../../model/tweet.model";
import { PostsComponent } from "../posts/posts.component";

@Component({
  selector: "app-tweet",
  templateUrl: "./tweet.component.html",
  styleUrls: ["./tweet.component.scss"]
})
export class TweetComponent implements OnInit, OnDestroy {

  @ViewChild(PostsComponent) posts: PostsComponent;

  public imageSrc: string = "../../../../assets/icons/male_avatar.svg";
  public name: string;
  public tweetForm: FormGroup;
  public errorMessage: string;
  public isInvalid = false;
  public isPosted = false;

  private destroy = new Subject<void>();
  private gender: string;
  private tweet: Tweet;
  private userName: string;

  constructor(
    private readonly store: Store<fromApp.TweetAppState>,
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.store
      .select(fromApp.AppStates.userState)
      .pipe(takeUntil(this.destroy))
      .subscribe((userState) => {
        if(userState.user) {
          if(userState.user.token) {
            this.setToStorage(userState.user.token);
            this.name = userState.user.firstName.toUpperCase() + " " + userState.user.lastName.toUpperCase();
            this.gender = userState.user.gender;
            this.userName = userState.user.emailId;
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
      this.getAllUsers();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private initializeForm(): void {
    this.tweetForm = this.formBuilder.group({
      tweetBox: ["", this.validationService.requiredField]
    });
  }

  private setToStorage(token: string): void {
    localStorage.setItem("token", token);
    sessionStorage.setItem("token", token);
  }

  private getAllUsers() {
    if(localStorage.getItem("token") || sessionStorage.getItem("token")) {
      this.store.dispatch(new userActions.FetchAllUsers());
    }
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

  public postTweet(): void {
    if(this.tweetForm.valid) {
      this.tweet = {
        tweetText: this.tweetForm?.value?.tweetBox
      }
      this.store.dispatch(new tweetActions.CreateTweet(this.tweet, this.userName));
      this.store
      .select(fromApp.AppStates.tweetState)
      .pipe(takeUntil(this.destroy))
      .subscribe((tweetState) => { 
        if(tweetState.error){
          this.errorMessage = tweetState.error.errorMessage;
          this.isInvalid = true;
          this.isPosted = false;
        }
        else {
          this.tweetForm.reset();
          this.tweetForm.markAsPristine();
          this.posts.fetchTweets();
          this.posts.setTweets();
          this.isPosted = true;
        }
      });
    }
  }
}
