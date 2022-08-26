import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import * as fromApp from "../../../../store/tweetapp.reducer";
import { ReplyText, ReplyTweet, Tweet, TweetResponse } from "../../model/tweet.model";
import * as tweetActions from "../../store/tweet.action";
import * as userActions from "../../../user/store/user.action";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ValidationService } from "../../../../shared/services/validation.service";

@Component({
  selector: "app-reply",
  templateUrl: "./reply.component.html",
  styleUrls: ["./reply.component.scss"]
})
export class ReplyComponent implements OnInit, OnDestroy {

  public isEditMode: boolean;
  public tweet: TweetResponse;
  public modifyForm: FormGroup;
  public commentForm: FormGroup;
  public post: string;
  public replies: ReplyTweet[];
  public userName: string;
  public errorMessage: string;
  public isInvalid = false;
  public isUpdated = false;

  private destroy = new Subject<void>();
  private tweetText: Tweet;
  private replyText: ReplyText;
  private tweetId: string;
  
  constructor(
    private readonly location: Location,
    private readonly store: Store<fromApp.TweetAppState>,
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.userStore();
    this.callStore();
    this.setForm();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private initializeForm(): void {
    this.modifyForm = this.formBuilder.group({
      tweetBox: ["", this.validationService.requiredField]
    });
    this.commentForm = this.formBuilder.group({
      commentBox: ["", this.validationService.requiredField]
    });
  }

  private callStore(): void {
    this.store
      .select(fromApp.AppStates.tweetState)
      .pipe(takeUntil(this.destroy))
      .subscribe((tweetState) => {
        if(tweetState?.tweetById) {
          this.tweet = tweetState?.tweetById;
          this.isEditMode = tweetState?.isEdit;
          this.replies = tweetState?.tweetById?.replies;
          this.tweetId =  tweetState?.tweetId;
        }
        else {
          this.store.dispatch(new userActions.RedirectToLogin());
        }
      });
  }

  private userStore(): void {
    this.store
      .select(fromApp.AppStates.userState)
      .pipe(takeUntil(this.destroy))
      .subscribe((userState) => {
        this.userName = userState?.user?.emailId;
      }
    );
  }

  private setForm(): void {
    this.modifyForm.patchValue({
      tweetBox: this.tweet?.tweetText
    });
    this.post = this.tweet?.tweetText;
  }

  public postTweet(): void {
    if(this.modifyForm.valid) {
      this.tweetText = {
        tweetText: this.modifyForm?.value?.tweetBox
      };
      this.store.dispatch(new tweetActions.UpdateTweet(this.tweetText, this.userName, this.tweetId));
      this.isServiceErrors();
    }
  }

  public comment(): void {
    if(this.commentForm.valid) {
      this.replyText = {
        tweetText: this.commentForm?.value?.commentBox
      };
      this.store.dispatch(new tweetActions.ReplyTweet(this.replyText, this.userName, this.tweetId));
      this.isServiceErrors();
    }
  }

  private isServiceErrors(): void {
    this.store
      .select(fromApp.AppStates.tweetState)
      .pipe(takeUntil(this.destroy))
      .subscribe((tweetState) => { 
        if(tweetState?.error?.errorMessage){
          this.errorMessage = tweetState?.error?.errorMessage;
          this.isInvalid = true;
          this.isUpdated = false;
        }
        else if(!tweetState?.error?.errorMessage && tweetState?.replySuccessful){
          this.commentForm.reset();
          this.commentForm.markAsPristine();
          this.isInvalid = false;
          this.store.dispatch(new tweetActions.GotoRefresh());
        }
        else if(!tweetState?.error?.errorMessage && tweetState?.tweetResponse) {
          this.isInvalid = false;
          this.isUpdated = true;
          this.store.dispatch(new tweetActions.GotoRefresh());
        }
      });
  }

  public falseDirective(): void {
    this.isInvalid = false;
    this.isUpdated = false;
  }
  public goToSubscribers(userId: string): void {

  }

  public back(): void {
    this.location.back();
  }

}
