import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./main/user/components/login/login.component";
import { RegisterComponent } from "./main/user/components/register/register.component";
import { TweetComponent } from "./main/tweet/component/tweet.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "tweet",
    component: TweetComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
