import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Constants } from "./shared/constants/constants";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private readonly translate: TranslateService){
    translate.setDefaultLang(Constants.englishLanguageKey);
    translate.use(Constants.englishLanguageKey);
  }
  title = "com-tweetapp";
}
