import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import * as fromApp from "../../../../store/tweetapp.reducer";
import { TweetResponse } from "../../model/tweet.model";
import * as tweetActions from "../../store/tweet.action";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit, OnDestroy {

  public likeImageSrc: string;
  public isComment = false;
  public tweets: TweetResponse[];
  public userName: string;

  private isLiked = false;
  private destroy = new Subject<void>();

  constructor(
    private readonly store: Store<fromApp.TweetAppState>
  ) { }

  ngOnInit(): void {
    if(this.isLiked) {
      this.likeImageSrc = "../../../../../assets/icons/liked.svg";
    }
    else {
      this.likeImageSrc = "../../../../../assets/icons/notliked.svg";
    }
    if(localStorage.getItem("token")){
      this.fetchTweets();
      this.setTweets();
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  
  public fetchTweets(): void {
    this.store.dispatch(new tweetActions.FetchTweets());
  }

  public setTweets(): void {
    this.store
      .select(fromApp.AppStates.userState)
      .pipe(takeUntil(this.destroy))
      .subscribe((userState) => {
        this.userName = userState.user.emailId;
      }
    );
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

  public likeStatus(tweetId: string): void {
    this.isLiked = !this.isLiked;
    //this.store.dispatch(new )
    if(this.isLiked) {
      this.likeImageSrc = "../../../../../assets/icons/liked.svg";
    }
    else {
      this.likeImageSrc = "../../../../../assets/icons/notliked.svg";
    }
  }

  public commentClicked(): void {
    this.isComment = !this.isComment;
  }

  public getUserDp(gender: string): string {
    if(gender.toLowerCase() === "female"){
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
}
