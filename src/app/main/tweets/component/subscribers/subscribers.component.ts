import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { UserDetails } from 'src/app/main/user/model/login.model';
import * as fromApp from "../../../../store/tweetapp.reducer";
import * as tweetActions from "../../store/tweet.action";

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit, OnDestroy {

  public name: string;
  public imageSrc: string;
  public birthDate: string;
  public userName: string;
  public gender: string;
  public format = "dd/MM/yyyy";

  private user: UserDetails;
  private destroy = new Subject<void>();

  constructor(
    private readonly location: Location,
    private readonly store: Store<fromApp.TweetAppState>,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("token") || sessionStorage.getItem("token")){
      this.setUser();
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private setUser(): void {
    this.store
      .select(fromApp.AppStates.tweetState)
      .pipe(takeUntil(this.destroy))
      .subscribe((tweetState) => {
        this.user = tweetState.user;
        this.name = tweetState?.user?.firstName + " " + tweetState?.user?.lastName;
        this.userName = tweetState?.user?.emailId;
        this.gender = tweetState?.user?.gender;
        this.birthDate = tweetState?.user?.dateOfBirth?.toLocaleString();
        console.log(this.birthDate);
      }
    );
  }

  public getUserDp(): string {
    if(this.user?.gender?.toLowerCase() === "male") {
      return "../../../../../assets/icons/male_avatar.svg";
    }
    return "../../../../../assets/icons/female_avatar.svg";
  }

  public back(): void {
    this.location.back();
  }

}
