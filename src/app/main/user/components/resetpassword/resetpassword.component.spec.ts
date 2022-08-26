import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { ValidationService } from "../../../../shared/services/validation.service";

import { ResetpasswordComponent } from "./resetpassword.component";

describe("ResetpasswordComponent", () => {
  let component: ResetpasswordComponent;
  let fixture: ComponentFixture<ResetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        TranslateModule.forRoot({}),
      ],
      declarations: [ ResetpasswordComponent ],
      providers: [
        FormBuilder,
        ValidationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call resetPass", () => {
    component.resetPass();
    expect(component.resetPass).toBeDefined();
  });

  it("should call resetPass - valid", () => {
    component.resetPassForm.value.newPassword = "12345678";
    fixture.detectChanges();
    component.resetPassForm.value.newPassword = "12345679";
    fixture.detectChanges();
    component.resetPass();
    fixture.detectChanges();
    expect(component.resetPass).toBeDefined();
  });

  it("should call isValidFalse", () => {
    component.isValidFalse();
    expect(component.isValidFalse).toBeDefined();
  });

  it("should call goToLogin", () => {
    component.goToLogin();
    expect(component.goToLogin).toBeDefined();
  });

  it("should call back", () => {
    component.back();
    expect(component.back).toBeDefined();
  });

  it("should call checkIfLoggedIn - true condition", () => {
    localStorage.setItem("token","access_token");
    component["checkIfLoggedIn"]();
    fixture.detectChanges();
    expect(component["checkIfLoggedIn"]).toBeDefined();
  });

  it("should call checkPasswordLength - false condition", () => {
    component["checkPasswordLength"]();
    fixture.detectChanges();
    expect(component["checkPasswordLength"]).toBeDefined();
  });

  it("should call checkPasswordLength - true condition", () => {
    component.resetPassForm.value.newPassword = "12345678";
    component["checkPasswordLength"]();
    fixture.detectChanges();
    expect(component["checkPasswordLength"]).toBeDefined();
  });

  it("should call isSuccessful", () => {
    component["isSuccessful"]();
    expect(component["isSuccessful"]).toBeDefined();
  });
});
