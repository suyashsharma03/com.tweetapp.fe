import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { Constants } from "./shared/constants/constants";
export let browserRefresh = false;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public isLoggedIn = false;
  private subscription: Subscription;
  constructor(
    private readonly translate: TranslateService,
    private readonly location: Location,
    private readonly router: Router,
    ){
    translate.setDefaultLang(Constants.englishLanguageKey);
    translate.use(Constants.englishLanguageKey);
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }

  public setLoginStatus(): void {
    if(
      this.location.path().indexOf("login") < 0 &&
      this.location.path().indexOf("register") < 0 &&
      this.location.path().indexOf("unauthorized") < 0 &&
      this.location.path().indexOf("forgotpassword") < 0 &&
      this.location.path().indexOf("resetpassword") < 0
    ){
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }
  title = "com-tweetapp";
}
