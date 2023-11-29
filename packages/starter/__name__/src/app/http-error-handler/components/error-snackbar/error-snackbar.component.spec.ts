import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorSnackbarComponent} from './error-snackbar.component';
import {MAT_SNACK_BAR_DATA, MatSnackBarModule} from "@angular/material/snack-bar";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {StoreModule} from "@ngrx/store";
import {AppStore} from "../../../store/app-store.model";
import {currentErrors} from "../../../store/app.selectors";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('ErrorSnackbarComponent for severity 4', () => {
  let component: ErrorSnackbarComponent;
  let fixture: ComponentFixture<ErrorSnackbarComponent>;
    let store: MockStore<AppStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorSnackbarComponent],
      imports: [StoreModule.forRoot({}), MatSnackBarModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: MAT_SNACK_BAR_DATA, useValue: {duration: 2000}},
          provideMockStore({
              selectors: [
                  {selector: currentErrors, value: [{message: "Item does not exist.", severity: 3}, {message: "Not a valid item", severity: 4}]}
              ]
          })
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ErrorSnackbarComponent);
    component = fixture.componentInstance;
      store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should call closeSnackBar..',()=>{
    spyOn(component.snackBar, 'dismiss');
    component.closeSnackBar();
    expect(component.snackBar.dismiss).toHaveBeenCalled();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('ErrorSnackbarComponent for severity 3', () => {
    let component: ErrorSnackbarComponent;
    let fixture: ComponentFixture<ErrorSnackbarComponent>;
    let store: MockStore<AppStore>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ErrorSnackbarComponent],
            imports: [StoreModule.forRoot({}), MatSnackBarModule],
            providers: [
                {provide: MAT_SNACK_BAR_DATA, useValue: {}},
                provideMockStore({
                    selectors: [
                        {selector: currentErrors, value: [{message: "Item does not exist.", severity: 3}, {message: "Not a valid item", severity: 4}]}
                    ]
                })
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(ErrorSnackbarComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
