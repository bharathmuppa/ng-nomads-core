import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorDialogComponent} from './error-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StoreModule} from "@ngrx/store";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
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
describe('ErrorHandlersComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;
    let store: MockStore<AppStore>;
  const dialogMockFn = {
    close: () => {
    },
    open: () => {
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorDialogComponent],
      imports:[StoreModule.forRoot({})],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: dialogMockFn},
        provideMockStore({
            selectors: [
                {selector: currentErrors, value: [{message: "Operation Failed. Pleae mention the transaction id while raising the ticket id9848e08038", severity: 1}]}
            ]
        })
      ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
      store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should call closeDialog..',()=>{
    spyOn(component.dialogRef, 'close');
    component.closeDialog();
    expect(component.dialogRef.close).toHaveBeenCalled();
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
