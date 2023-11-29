import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorNotificationBannerComponent} from './error-notification-banner.component';
import {MAT_SNACK_BAR_DATA, MatSnackBarModule} from "@angular/material/snack-bar";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {MatDialogRef} from "@angular/material/dialog";
import {of} from "rxjs";
import {currentErrors} from "../../../store/app.selectors";
import {AppStore} from "../../../store/app-store.model";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

export class MatDialogStub {
  result: boolean = true;

  setResult(val: boolean) {
    this.result = val;
  }

  open() {
    return {afterClosed: () => of(this.result)};
  }

  close() {
  }

  afterClosed() {
    return of('');
  }
}
describe('ErrorNotificationBannerComponent', () => {
  let component: ErrorNotificationBannerComponent;
  let fixture: ComponentFixture<ErrorNotificationBannerComponent>;
  let store: MockStore<AppStore>;
  const dialogMockFn = {
    close: () => {
    },
    open: () => {
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatSnackBarModule],
      declarations: [ ErrorNotificationBannerComponent ],
      providers: [
        {provide: MAT_SNACK_BAR_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: dialogMockFn},
          provideMockStore({
              selectors: [
                  {selector: currentErrors, value: [{message: "Operation Failed. Pleae mention the transaction id while raising the ticket id9848e08038", severity: 2}]}
              ]
          })
      ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorNotificationBannerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should call closeDialog..',()=>{
    spyOn(component.dialogRef, 'close');
    component.closeBanner();
    expect(component.dialogRef.close).toHaveBeenCalled();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
