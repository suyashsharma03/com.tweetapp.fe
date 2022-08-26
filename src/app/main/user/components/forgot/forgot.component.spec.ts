import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { ValidationService } from "../../../../shared/services/validation.service";
import { ForgotComponent } from "./forgot.component";

describe("ForgotComponent", () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        TranslateModule.forRoot({}),
      ],
      declarations: [
        ForgotComponent,
      ],
      providers: [
        FormBuilder,
        ValidationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call ngOnInit", () => {
    component.ngOnInit();
    expect(component.ngOnInit).toBeDefined();
  });

  it("should call isValidFalse", () => {
    component.isValidFalse();
    expect(component.isValidFalse).toBeDefined();
  });

  it("should call forgotPass - form not valid", () => {
    component.forgotPass();
    expect(component.forgotPass).toBeDefined();
  });
  
  it("should call forgotPass - form valid", () => {
    component.forgotPassForm.patchValue({
      email: "abc@abc.com",
      securityQuestion: 1,
      securityAnswer: "na"
    });
    component.forgotPass();
    expect(component.forgotPass).toBeDefined();
  });

  it("should call forgotPass - form valid - email format wrong", () => {
    component.forgotPassForm.patchValue({
      email: "abc",
      securityQuestion: 1,
      securityAnswer: "na"
    });
    component.forgotPass();
    expect(component.forgotPass).toBeDefined();
  });

  it("should call goToLogin", () => {
    component.goToLogin();
    expect(component.goToLogin).toBeDefined();
  });

  it("should call checkEmailFormat - false condition", () => {
    component.forgotPassForm.value.email = "abc";
    component["checkEmailFormat"]();
    expect(component["checkEmailFormat"]).toBeDefined();
  });

  it("should call checkEmailFormat - true condition", () => {
    component.forgotPassForm.value.email = "abc@abc.com";
    component["checkEmailFormat"]();
    expect(component["checkEmailFormat"]).toBeDefined();
  });

  it("should call isError", () => {
    component["isError"]();
    expect(component["isError"]).toBeDefined();
  });
});
