import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        TranslateModule.forRoot({}),
      ],
      declarations: [ HeaderComponent ],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should define isLoggedIn", () => {
    expect(component.isLoggedIn).toBeFalse();
  });

  it("should call ngOnInit", () => {
    expect(component.ngOnInit).toBeDefined();
  });

  it("should call logout", () => {
    component.logout();
    expect(component.logout).toBeDefined();
  });

  it("should call goToResetPassword", () => {
    component.goToResetPassword();
    expect(component.goToResetPassword).toBeDefined();
  });

  it("should call goToProfile", () => {
    component.isLoggedIn = true;
    component.goToProfile();
    fixture.detectChanges();
    expect(component.userName).toEqual(undefined);
  });

  it("should call searchUsers - false", () => {
    component.isLoggedIn = true;
    component.searchForm.value.search = "abcd";
    component.searchUsers();
    expect(component.searchUsers).toBeDefined();
  });

  it("should call searchUsers - true", () => {
    component.isLoggedIn = true;
    component.searchForm.value.search = "abc@abc.com";
    component.searchUsers();
    expect(component.searchUsers).toBeDefined();
  });
});
