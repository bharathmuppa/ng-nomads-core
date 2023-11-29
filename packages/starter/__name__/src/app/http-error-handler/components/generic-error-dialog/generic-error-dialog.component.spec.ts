import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericErrorDialogComponent } from './generic-error-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MockMatDialogRef } from '../../../impact-matrix/impact-matrix-dialogs/impact-matrix-save-revision-dialog/impact-matrix-save-revision-dialog.component.spec';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NgZone, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('GenericErrorDialogComponent', () => {
  let component: GenericErrorDialogComponent;
  let fixture: ComponentFixture<GenericErrorDialogComponent>;
  let ngZone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserDynamicTestingModule],
      declarations: [GenericErrorDialogComponent],
      providers: [
        { provide: MatDialogRef, useClass: MockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { subTitle: null, title: 'Parallel Update Warning' } },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    ngZone = TestBed.inject(NgZone);
    fixture = TestBed.createComponent(GenericErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeDialog', async () => {
    spyOn(ngZone, 'run').and.callFake((fn: Function) => fn());
    component.closeDialog();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(ngZone.run).toHaveBeenCalled();
  });

  it('should call refreshData', async () => {
    spyOn(ngZone, 'run').and.callFake((fn: Function) => fn());
    component.refreshData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(ngZone.run).toHaveBeenCalled();
  });
});

export class MockNgZone {
  run(callback: () => void) {
    return of(true);
  }
}
