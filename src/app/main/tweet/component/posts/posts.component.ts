import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {

  public likeImageSrc: string;
  public isComment = false;

  private isLiked = false;

  constructor() { }

  ngOnInit(): void {
    if(this.isLiked) {
      this.likeImageSrc = "../../../../../assets/icons/liked.svg";
    }
    else {
      this.likeImageSrc = "../../../../../assets/icons/notliked.svg";
    }
  }

  public likeStatus(): void {
    this.isLiked = !this.isLiked;
    if(this.isLiked) {
      this.likeImageSrc = "../../../../../assets/icons/liked.svg";
    }
    else {
      this.likeImageSrc = "../../../../../assets/icons/notliked.svg";
    }
  }

  public commentClicked(): void {
    this.isComment = !this.isComment;
  }
}
