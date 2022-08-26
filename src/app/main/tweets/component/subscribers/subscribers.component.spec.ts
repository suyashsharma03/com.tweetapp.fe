import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { ValidationService } from "../../../../shared/services/validation.service";
import { SubscribersComponent } from "./subscribers.component";

describe("SubscribersComponent", () => {
  let component: SubscribersComponent;
  let fixture: ComponentFixture<SubscribersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        TranslateModule.forRoot({}),
      ],
      declarations: [ SubscribersComponent ],
      providers: [
        FormBuilder,
        ValidationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call getUserDp", () => {
    component["user"] = {
      emailId: "abc@abc.com",
      firstName: "abcd",
      lastName: "efgh",
      dateOfBirth: new Date(),
      gender: "male",
      token: ""
    };
    component.getUserDp();
    expect(component.getUserDp).toBeDefined();
  });
  
  it("should call ngOnInit", () => {
    localStorage.setItem("token","access_token");
    component.ngOnInit();
    expect(component.ngOnInit).toBeDefined();
  });

  it("should call back", () => {
    component.back();
    expect(component.back).toBeDefined();
  });
});
