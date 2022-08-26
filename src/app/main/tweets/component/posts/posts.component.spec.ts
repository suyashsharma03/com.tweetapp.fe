import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { ValidationService } from "../../../../shared/services/validation.service";
import { PostsComponent } from "./posts.component";

describe("PostsComponent", () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        TranslateModule.forRoot({}),
      ],
      declarations: [ PostsComponent ],
      providers: [
        FormBuilder,
        ValidationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call ngOnInt - userid doesn't exists", () => {
    localStorage.setItem("token","access_token");
    component.ngOnInit();
    expect(component.ngOnInit).toBeDefined();
  });

  it("should call ngOnInt - userid exists", () => {
    localStorage.setItem("token","access_token");
    component.userId = "abc@abc.com";
    component.ngOnInit();
    expect(component.ngOnInit).toBeDefined();
  });

  it("should call likeStatus", () => {
    component.likeStatus("123456");
    expect(component.likeStatus).toBeDefined();
  });

  it("should call commentClicked", () => {
    component.commentClicked("123456","abc@abc.com");
    expect(component.commentClicked).toBeDefined();
  });

  it("should call getUserDp", () => {
    component.getUserDp("abc@abc.com");
    expect(component.getUserDp).toBeDefined();
  });

  it("should call editTweet", () => {
    component.editTweet("123456","abc@abc.com");
    expect(component.editTweet).toBeDefined();
  });

  it("should call deleteTweet", () => {
    component.deleteTweet("123456");
    expect(component.deleteTweet).toBeDefined();
  });
  it("should call goToSubscribers", () => {
    component.goToSubscribers("abc@abc.com");
    expect(component.goToSubscribers).toBeDefined();
  });
});
