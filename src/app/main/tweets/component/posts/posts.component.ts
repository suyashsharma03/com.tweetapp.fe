import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { UserDetails } from "../../../../main/user/model/login.model";
import * as fromApp from "../../../../store/tweetapp.reducer";
import { TweetResponse } from "../../model/tweet.model";
import * as tweetActions from "../../store/tweet.action";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit, OnDestroy {

  @Input() userId?: string;
  public likeImageSrc: string = "../../../../../assets/icons/liked.svg";
  public isComment = false;
  public tweets: TweetResponse[];
  public userName: string;

  private allUsers: UserDetails[];
  private isLiked = false;
  private destroy = new Subject<void>();

  constructor(
    private readonly store: Store<fromApp.TweetAppState>
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      if(!this.userId) {
        this.fetchTweets();
        this.setTweets();
      }
      else {
        this.fetchParticularUserTweets();
        this.setParticularUserTweets();
      }
      this.getLoggedInUserDetails();
      this.getAllUsers();
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  
  private getLoggedInUserDetails(): void {
    this.store
      .select(fromApp.AppStates.userState)
      .pipe(takeUntil(this.destroy))
      .subscribe((userState) => {
        this.userName = userState.user.emailId;
      }
    );
  }

  public fetchTweets(): void {
    this.store.dispatch(new tweetActions.FetchTweets());
  }

  public setTweets(): void {
    this.store
      .select(fromApp.AppStates.tweetState)
      .pipe(takeUntil(this.destroy))
      .subscribe((tweetState) => { 
        if(tweetState.tweets){
          this.tweets = tweetState.tweets;
        }
      }
    );
  }

  private fetchParticularUserTweets(): void {
    this.store.dispatch(new tweetActions.FetchTweet(this.userId));
  }

  private setParticularUserTweets(): void {
    this.store
      .select(fromApp.AppStates.tweetState)
      .pipe(takeUntil(this.destroy))
      .subscribe((tweetState) => { 
        if(tweetState.userTweets) {
          this.tweets = tweetState.userTweets;
        }
      }
    );
  }

  private getAllUsers(): void {
    this.store
      .select(fromApp.AppStates.userState)
      .pipe(takeUntil(this.destroy))
      .subscribe((userState) => {
        if(userState?.allUsers) {
          this.allUsers = userState?.allUsers;
        }
      })
  }

  public likeStatus(tweetId: string): void {
    this.isLiked = !this.isLiked;
    //this.store.dispatch(new )
  }

  public commentClicked(): void {
    this.isComment = !this.isComment;
  }

  public getUserDp(userEmail: string): string {
    const gender = this.allUsers?.filter(user => {
      userEmail === user.emailId
    })[0]?.gender;
    if(gender?.toLowerCase() === "female"){
      return "../../../../assets/icons/female_avatar.svg";
    }
    else {
      return "../../../../assets/icons/male_avatar.svg";
    }
  }

  public editTweet(tweetId: string, userId: string): void {

  }

  public deleteTweet(tweetId: string): void {

  }

  public goToSubscribers(userName: string): void {
    this.store.dispatch(new tweetActions.GetUser(userName));
  }
}
