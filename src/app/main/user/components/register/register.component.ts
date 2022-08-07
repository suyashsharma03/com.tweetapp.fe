import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Constants } from "../../../../shared/constants/constants";
import { ValidationService } from "../../../../shared/services/validation.service";
import { UserRegistration } from "../../model/register.model";
import * as userActions from "../../store/user.action";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public securityQuestions: string[] = Constants.securityQuestions;
  public isInvalid = false;

  private userRegistration: UserRegistration;

  constructor(
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  private initializeLoginForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ["", this.validationService.requiredField],
      lastName: ["", this.validationService.requiredField],
      email: ["", this.validationService.requiredField],
      phone: ["", this.validationService.requiredField],
      password: ["", this.validationService.requiredField],
      confirmPassword: ["", this.validationService.requiredField],
      dob: ["", this.validationService.requiredField],
      gender: ["", this.validationService.requiredField],
      securityQuestion: ["1", this.validationService.requiredField],
      securityAnswer: ["", this.validationService.requiredField],
    })
  }

  public goToLogin(): void {
    this.store.dispatch(new userActions.RedirectToLogin());
  }

  public register(): void {
    if(!this.registerForm.valid) {
      this.isInvalid = true;
    }
    else {
      const valid: boolean = this.comparePassword();
      if(valid) {
        const genderValue: string = this.getGender();
        if(genderValue) {
          this.userRegistration = {
            firstName: this.registerForm?.value?.firstName,
            lastName: this.registerForm?.value?.lastName,
            emailId: this.registerForm?.value?.email,
            phone: this.registerForm?.value?.phone,
            password: this.registerForm?.value?.password,
            confirmPassword: this.registerForm?.value?.confirmPassword,
            dateofbirth: this.registerForm?.value?.dob,
            gender: genderValue,
            securityQuestion: this.registerForm?.value?.securityQuestion,
            securityAnswer: this.registerForm?.value?.securityAnswer,
          }
          this.store.dispatch(new userActions.FetchUserDetails(this.userRegistration));
          console.log(this.userRegistration);
        }
        else {
          alert("Gender Value Not Selected");
        }
      }
      else{
        alert("Password and Confirm Password do not match");
      }
      console.log(this.registerForm);
    }
  }

  private comparePassword(): boolean {
    if(this.registerForm?.value?.password === this.registerForm?.value?.confirmPassword){
      return true;
    }
    else {
      return false;
    }
  }

  private getGender(): string {
    switch(this.registerForm?.value?.gender) {
      case "1":
        return "Female";
      case "2":
        return "Male";
      case "3":
        return "Other";
      default:
        return null;
    }
  }
}
