import {IAMErrorsService} from "./errors.service";
import {TestBed} from "@angular/core/testing";
import {MatDialog} from "@angular/material/dialog";
import {MockDialog} from "./error-dialog-helper.service.spec";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MockErrorDialogHelperService, MockMatSnackBar} from "../../impact-matrix/impact-matrix-details/impact-matrix-details.component.spec";
import {ErrorDialogHelperService} from "./error-dialog-helper.service";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppStore} from "../../store/app-store.model";
import {MockingSnacker} from "../../impact-matrix/services/impact-matrix-relation.service.spec";

describe('ErrorsService', function () {
    let service: IAMErrorsService;
    let store: MockStore<AppStore>;
    let errorDialogHelperService: ErrorDialogHelperService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: MatDialog, useClass: MockDialog},
                {provide: MatSnackBar, useClass: MockMatSnackBar},
                {provide: ErrorDialogHelperService, useClass: MockErrorDialogHelperService},
                provideMockStore()
            ]
        });

        service = TestBed.inject(IAMErrorsService);
        store = TestBed.inject(MockStore);
        errorDialogHelperService = TestBed.inject(ErrorDialogHelperService);
    });

    it('should call openErrorAsDialog', async () => {
        (service as any).matDialog = new MockDialog();
        service.openErrorAsDialog(() => {});
        expect(service).toBeTruthy();
    });

    it('should call openErrorsInBanner', async () => {
        (service as any).matDialog = new MockDialog();
        service.openErrorsInBanner(() => {});
        expect(service).toBeTruthy();
    });

    it('should call showErrorsInSnackbar', async () => {
        (service as any).snackBar = new MockingSnacker();
        service.showErrorsInSnackbar(() => {}, 2000);
        expect(service).toBeTruthy();
    });

    it('should call openParallelUpdateDialog', function () {
        spyOn(errorDialogHelperService, "openParallelUpdateDialogWithRefreshAction").and.callThrough();
        service.openParallelUpdateDialog({});
        expect(errorDialogHelperService.openParallelUpdateDialogWithRefreshAction).toHaveBeenCalled();
    });

    it('should call openUnauthorizedUserDialog', function () {
        spyOn(errorDialogHelperService, "openUnauthorizedUserDialog").and.callThrough();
        service.openUnauthorizedUserDialog();
        expect(errorDialogHelperService.openUnauthorizedUserDialog).toHaveBeenCalled();
    });
});
