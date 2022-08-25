import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({}),
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the app", () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title "com-tweetapp"`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual("com-tweetapp");
  });

  it("should call setLoginStatus - true condition", () => {
    component.setLoginStatus();
    expect(component.setLoginStatus).toBeDefined()
  });

  // it("should call setLoginStatus - false condition", () => {
  //   location.path().concat("login");
  //   component.setLoginStatus();
  //   expect(component.isLoggedIn).toBeFalse()
  // });
});
