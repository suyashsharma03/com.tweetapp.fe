import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { ValidationService } from "../../../../shared/services/validation.service";
import { ReplyComponent } from "./reply.component";

describe("ReplyComponent", () => {
  let component: ReplyComponent;
  let fixture: ComponentFixture<ReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        TranslateModule.forRoot({}),
      ],
      declarations: [ ReplyComponent ],
      providers: [
        FormBuilder,
        ValidationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call postTweet", () => {
    component.modifyForm.patchValue({
      tweetBox: "abcdefgh"
    });
    component.postTweet();
    expect(component.postTweet).toBeDefined();
  });

  it("should call comment", () => {
    component.commentForm.patchValue({
      commentBox: "abcdefgh"
    });
    component.comment();
    expect(component.comment).toBeDefined();
  });

  it("should call falseDirective", () => {
    component.falseDirective();
    expect(component.falseDirective).toBeDefined();
  });

  it("should call goToSubscribers", () => {
    component.goToSubscribers("abc@abc.com");
    expect(component.goToSubscribers).toBeDefined();
  });

  it("should call back", () => {
    component.back();
    expect(component.back).toBeDefined();
  });
});
