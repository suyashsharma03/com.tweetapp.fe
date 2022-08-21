import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./main/user/components/login/login.component";
import { RegisterComponent } from "./main/user/components/register/register.component";
import { TweetComponent } from "./main/tweets/component/tweet/tweet.component";
import { UnauthorizedComponent } from "./shared/component/unauthorized/unauthorized.component";
import { SubscribersComponent } from "./main/tweets/component/subscribers/subscribers.component";
import { ResetpasswordComponent } from "./main/user/components/resetpassword/resetpassword.component";
import { ForgotComponent } from "./main/user/components/forgot/forgot.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/tweet",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "tweet",
    component: TweetComponent,
  },
  {
    path: "unauthorized",
    component: UnauthorizedComponent
  },
  {
    path: "subscriber",
    component: SubscribersComponent
  },
  {
    path: "resetpassword",
    component: ResetpasswordComponent
  },
  {
    path: "forgotpassword",
    component: ForgotComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "top"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
