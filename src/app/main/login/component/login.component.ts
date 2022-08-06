import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as loginActions from "../store/login.action";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly store: Store
  ) { }

  ngOnInit(): void {
  }

  goToRegister(): void {
    this.router.navigate(["/register"]);
  }

  login(): void {
    this.store.dispatch(new loginActions.FetchLogin({
      "emailId": "test@test.com",
      "password": "password"
    }))
  }

}
