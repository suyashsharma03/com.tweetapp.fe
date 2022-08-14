import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Constants } from "./shared/constants/constants";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public isLoggedIn = false;
  constructor(
    private readonly translate: TranslateService,
    private readonly location: Location
    ){
    translate.setDefaultLang(Constants.englishLanguageKey);
    translate.use(Constants.englishLanguageKey);
  }

  public setLoginStatus(): void {
    if(
      this.location.path().indexOf("login") < 0 &&
      this.location.path().indexOf("register") < 0 &&
      this.location.path().indexOf("unauthorized") < 0
    ){
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }
  title = "com-tweetapp";
}
