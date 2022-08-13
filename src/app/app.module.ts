import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./main/user/components/login/login.component";
import { UserService } from "./main/user/service/user.service";
import { UserCreateEffects } from "./main/user/store/user.effects";
import { RegisterComponent } from "./main/user/components/register/register.component";
import { TweetComponent } from "./main/tweet/component/tweet.component";
import { HeaderComponent } from './shared/component/header/header.component';
import * as fromAppStore from "./store/tweetapp.reducer";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ValidationService } from "./shared/services/validation.service";
import { PostsComponent } from './main/tweet/component/posts/posts.component';
import { MatIconModule } from "@angular/material/icon";

export function httpTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TweetComponent,
    HeaderComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromAppStore.tweetAppReducer),
    EffectsModule.forRoot([
      UserCreateEffects
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
    }),
    MatIconModule
  ],
  providers: [
    UserService,
    ValidationService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
