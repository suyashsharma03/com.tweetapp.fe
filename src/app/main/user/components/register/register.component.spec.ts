import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { ValidationService } from "../../../../shared/services/validation.service";

import { RegisterComponent } from "./register.component";

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        TranslateModule.forRoot({}),
      ],
      declarations: [ RegisterComponent ],
      providers: [
        FormBuilder,
        ValidationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call goToLogin", () => {
    component.goToLogin();
    expect(component.goToLogin).toBeDefined();
  });

  it("should call register", () => {
    component.register();
    expect(component.register).toBeDefined();
  });

  it("should call removeInvalid", () => {
    component.removeInvalid();
    expect(component.removeInvalid).toBeDefined();
  });

  it("should call isValidFalse", () => {
    component.isValidFalse();
    expect(component.isValidFalse).toBeDefined();
  });

  it("should call getGender - case 1", () => {
    component["getGender"]();
    fixture.detectChanges();
    expect(component["getGender"]).toBeDefined();
  });

  it("should call getGender - case default", () => {
    component.registerForm.value.gender = "90";
    component["getGender"]();
    fixture.detectChanges();
    expect(component["getGender"]).toBeDefined();
  });

  it("should call checkEmailFormat - false condition", () => {
    component.registerForm.value.email = "abc";
    component["checkEmailFormat"]();
    fixture.detectChanges();
    expect(component["checkEmailFormat"]).toBeDefined();
  });

  it("should call checkEmailFormat - true condition", () => {
    component.registerForm.value.email = "abc@abc.com";
    component["checkEmailFormat"]();
    fixture.detectChanges();
    expect(component["checkEmailFormat"]).toBeDefined();
  });

  it("should call checkPhoneFormat - false condition", () => {
    component.registerForm.value.phone = 12;
    component["checkPhoneFormat"]();
    fixture.detectChanges();
    expect(component["checkPhoneFormat"]).toBeDefined();
  });

  it("should call checkPhoneFormat - true condition", () => {
    component.registerForm.value.phone = 1234567890;
    component["checkPhoneFormat"]();
    fixture.detectChanges();
    expect(component["checkPhoneFormat"]).toBeDefined();
  });

  it("should call checkPasswordLength - false condition", () => {
    component.registerForm.value.phone = "abc";
    component["checkPasswordLength"]();
    fixture.detectChanges();
    expect(component["checkPasswordLength"]).toBeDefined();
  });

  it("should call checkPasswordLength - true condition", () => {
    component.registerForm.value.phone = "1234567";
    component["checkPasswordLength"]();
    fixture.detectChanges();
    expect(component["checkPasswordLength"]).toBeDefined();
  });

  it("should call errorOccurred", () => {
    component["errorOccurred"]();
    expect(component["errorOccurred"]).toBeDefined();
  });
});
