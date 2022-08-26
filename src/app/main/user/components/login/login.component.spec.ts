import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { ValidationService } from "../../../../shared/services/validation.service";
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        TranslateModule.forRoot({}),
      ],
      declarations: [ LoginComponent ],
      providers: [
        FormBuilder,
        ValidationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call goToRegister", () => {
    component.goToRegister();
    expect(component.goToRegister).toBeDefined();
  });

  it("should call login", () => {
    component.login();
    expect(component.login).toBeDefined();
  });

  it("should call login - valid", () => {
    component.loginForm.patchValue({
      email: "abc@abc.com",
      password: "123456"
    });
    component.login();
    expect(component.login).toBeDefined();
  });

  it("should call goToForgotPass", () => {
    component.goToForgotPass();
    expect(component.goToForgotPass).toBeDefined();
  });
});
