import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { ValidationService } from "../../../../shared/services/validation.service";

import { TweetComponent } from "./tweet.component";

describe("TweetComponent", () => {
  let component: TweetComponent;
  let fixture: ComponentFixture<TweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        TranslateModule.forRoot({}),
      ],
      declarations: [ TweetComponent ],
      providers: [
        FormBuilder,
        ValidationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call setToStorage", () => {
    component["setToStorage"]("access_token");
    expect(component["setToStorage"]).toBeDefined();
  });

  it("should call getUserDp", () => {
    component["gender"] = "female";
    component.getUserDp();
    expect(component.getUserDp).toBeDefined();
  });

  it("should call postTweet", () => {
    component.tweetForm.patchValue({
      tweetBox: "abcdefgh"
    });
    component.postTweet();
    expect(component.postTweet).toBeDefined();
  });

  it("should call falseDirective", () => {
    component.falseDirective();
    expect(component.falseDirective).toBeDefined();
  });

  it("should call clearStorage", () => {
    component["clearStorage"]();
    expect(component["clearStorage"]).toBeDefined();
  });
});
