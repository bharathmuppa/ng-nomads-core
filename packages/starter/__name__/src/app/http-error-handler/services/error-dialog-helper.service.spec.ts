import {TestBed} from '@angular/core/testing';

import {ErrorDialogHelperService} from './error-dialog-helper.service';
import {MatDialog} from "@angular/material/dialog";
import {of} from "rxjs";
import {CommentService} from "@ng-nomads-angular/comment";
import {MockCommentService} from "../../impact-matrix/impact-matrix-details/impact-matrix-details.component.spec";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppStore} from "../../store/app-store.model";
import {NgZone} from "@angular/core";
import {MockDialogRef} from "../../shared/components/iam-bulk-edit-dialog/iam-bulk-edit-dialog.component.spec";

describe('ErrorDialogHelperService', () => {
    let service: ErrorDialogHelperService;
    let commentService: CommentService;
    let store: MockStore<AppStore>;

    // @ts-ignore
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: MatDialog, useClass: MockDialog},
                {provide: CommentService, useClass: MockCommentService},
                provideMockStore({})
            ]
        });
        service = TestBed.inject(ErrorDialogHelperService);
        commentService = TestBed.inject(CommentService);
        store = TestBed.inject(MockStore);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call openParallelUpdateDialogWithRefreshAction with data', async () => {
        const zone = TestBed.get(NgZone);
        spyOn(zone, "run").and.callFake((fn: Function) => fn());
        service.dialogRef = undefined;
        service.openParallelUpdateDialogWithRefreshAction({showReload: true, message: "Error", errorData: {severity: 1, message: "Someone has changed the layout while you're gone."}});
        expect((service as any).ngZone.run).toHaveBeenCalled();
        expect(service).toBeTruthy();
    });

    it('should call openParallelUpdateDialogWithRefreshAction with data and dailoagRef defined', async () => {
        const zone = TestBed.get(NgZone);
        spyOn(zone, "run").and.callFake((fn: Function) => fn());
        //@ts-ignore
        service.dialogRef = new MockDialogRef();
        service.openParallelUpdateDialogWithRefreshAction({showReload: true, message: "Error", errorData: {severity: 1, message: "Someone has changed the layout while you're gone."}});
        expect((service as any).ngZone.run).toHaveBeenCalled();
        expect(service).toBeTruthy();
    });

    it('should call openParallelUpdateDialogWithAction', function () {
        (service as any).matDialog = new MockDialog();
        service.openParallelUpdateDialogWithAction({showReload: true, message: "Error", errorData: {severity: 1, message: "Someone has changed the layout while you're gone."}});
        expect(service).toBeTruthy();
    });

    it('should call openUnauthorizedUserDialog', function () {
        (service as any).matDialog = new MockDialog();
        service.openUnauthorizedUserDialog();
        expect(service).toBeTruthy();
    });

    it('should call openConfirmationDialog', function () {
        (service as any).matDialog = new MockDialog();
        service.openConfirmationDialog();
        expect(service).toBeTruthy();
    });

    it('should call openConfirmationDialog', function () {
        (service as any).matDialog = new MockDialogError();
        service.openConfirmationDialog();
        expect(service).toBeTruthy();
    });
});

export class MockDialog {
    open() {
        return {
            afterClosed: () => of({action: true})
        };
    }
    get openDialogs(): any
    {
        return []
    }
}


export class MockDialogError {
    open() {
        return {
            afterClosed: () => of(null)
        };
    }
    get openDialogs(): any
    {
        return []
    }
}

