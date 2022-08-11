import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tweet",
  templateUrl: "./tweet.component.html",
  styleUrls: ["./tweet.component.scss"]
})
export class TweetComponent implements OnInit {

  public imageSrc: string = "../../../../assets/icons/male_avatar.svg";
  constructor() { }

  ngOnInit(): void {
  }

  getUserDp(): void {
    this.imageSrc = "../../../../assets/icons/female_avatar.svg";
  }

}
