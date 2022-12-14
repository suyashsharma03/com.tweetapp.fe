import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { TweetComponent } from "./main/tweets/component/tweet/tweet.component";
import { HeaderComponent } from './shared/component/header/header.component';
import * as fromAppStore from "./store/tweetapp.reducer";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ValidationService } from "./shared/services/validation.service";
import { PostsComponent } from './main/tweets/component/posts/posts.component';
import { MatIconModule } from "@angular/material/icon";
import { UnauthorizedComponent } from './shared/component/unauthorized/unauthorized.component';
import { TweetCreateEffects } from "./main/tweets/store/tweet.effects";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TweetService } from "./main/tweets/service/tweet.service";
import { AuthInterceptor } from "./shared/interceptor/authinterceptor";
import { SubscribersComponent } from './main/tweets/component/subscribers/subscribers.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { ResetpasswordComponent } from './main/user/components/resetpassword/resetpassword.component';
import { ForgotComponent } from './main/user/components/forgot/forgot.component';
import { NgHttpLoaderModule } from "ng-http-loader";
import { RefreshComponent } from './shared/component/refresh/refresh.component';
import { ReplyComponent } from './main/tweets/component/reply/reply.component';

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
    PostsComponent,
    UnauthorizedComponent,
    SubscribersComponent,
    FooterComponent,
    ResetpasswordComponent,
    ForgotComponent,
    RefreshComponent,
    ReplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromAppStore.tweetAppReducer),
    EffectsModule.forRoot([
      UserCreateEffects,
      TweetCreateEffects
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
    }),
    NgHttpLoaderModule.forRoot(),
    MatIconModule,
    FlexLayoutModule
  ],
  providers: [
    UserService,
    TweetService,
    ValidationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
