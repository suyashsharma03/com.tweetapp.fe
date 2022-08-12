import { Location } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  @Input() isLoggedIn: boolean = false;

  constructor(
    private readonly location: Location
  ) {}

  ngOnInit(): void {
  }
}
