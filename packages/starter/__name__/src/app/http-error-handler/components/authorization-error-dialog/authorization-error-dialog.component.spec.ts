import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationErrorDialogComponent } from './authorization-error-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MockMatDialogRef } from '../../../impact-matrix/impact-matrix-dialogs/impact-matrix-save-revision-dialog/impact-matrix-save-revision-dialog.component.spec';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthorizationErrorDialogComponent', () => {
  let component: AuthorizationErrorDialogComponent;
  let fixture: ComponentFixture<AuthorizationErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizationErrorDialogComponent],
      providers: [
        { provide: MatDialogRef, useClass: MockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { errorType: 'authorisation' } },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorizationErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
