import {
    DUPLICATE_PART_ERROR_CODE,
    ErrorInterceptorService,
    PARALLEL_UPDATE_ERROR_CODE,
    UNAUTHORIZED_USER
} from "./interceptor.service";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppStore} from "../../store/app-store.model";
import {IAMErrorsService} from "./errors.service";
import { TestBed} from "@angular/core/testing";
import {
    MockIAMErrorsService
} from "../../impact-matrix/impact-matrix-details/impact-matrix-details.component.spec";
import {
    HttpClientTestingModule,
    HttpTestingController
} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpErrorResponse
} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {
    MockMatDialog
} from "../../impact-matrix/services/impact-matrix-duplication.service.spec";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
    MockingSnacker
} from "../../impact-matrix/services/impact-matrix-relation.service.spec";

describe('InterceptorService', function () {
    let service: ErrorInterceptorService
    let store: MockStore<AppStore>;
    let errorsService: IAMErrorsService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                {provide: IAMErrorsService, useClass: MockIAMErrorsService},
                {provide: MatDialog, useClass: MockMatDialog},
                {provide: MatSnackBar, useClass: MockingSnacker},
                provideMockStore(),
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorInterceptorService,
                    multi: true
                }
            ]
        })

        service = TestBed.inject(ErrorInterceptorService);
        store = TestBed.inject(MockStore);
        errorsService = TestBed.inject(IAMErrorsService);
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should create', function () {
        expect(service).toBeTruthy();
    });

    it('should call intercept method for unauthorized error', async () => {
        spyOn(errorsService, "openUnauthorizedUserDialog" ).and.callThrough();
        const url = 'http://some/testing';
        const err = new HttpErrorResponse({url: url,error: {severity: 1, application_status_code: UNAUTHORIZED_USER}})
        const httpRequest = httpClient.get(url);
        const httpReqPromise = firstValueFrom(httpRequest);
        httpTestingController.expectOne(url).flush(err.error, err);
        try {
            await httpReqPromise;
        } catch(error) {
            expect(error).toBeTruthy();
        }
        expect(errorsService.openUnauthorizedUserDialog).toHaveBeenCalled();
    });

    it('should call intercept method for parallel update error', async () => {
        const url = 'http://some/testing';
        const err = new HttpErrorResponse({url: url,error: {severity: 2, application_status_code: PARALLEL_UPDATE_ERROR_CODE}})
        const httpRequest = httpClient.get(url);
        const httpReqPromise = firstValueFrom(httpRequest);
        httpTestingController.expectOne(url).flush(err.error, err);
        try {
            await httpReqPromise;
        } catch(error) {
            expect(error).toBeTruthy();
        }
        expect(service).toBeTruthy();
    });

    it('should call intercept method for unknown error and open banner with serverity 2', async () => {
        spyOn(errorsService, "openErrorsInBanner").and.callThrough();
        (service as any).isBannerOpened = false;
        const url = 'http://some/testing';
        const err = new HttpErrorResponse({url: url,error: {severity: 2, application_status_code: "IAM-EXCEPTON-015"}})
        const httpRequest = httpClient.get(url);
        const httpReqPromise = firstValueFrom(httpRequest);
        httpTestingController.expectOne(url).flush(err.error, err);
        try {
            await httpReqPromise;
        } catch(error) {
            expect(error).toBeTruthy();
        }
        expect(errorsService.openErrorsInBanner).toBeTruthy();
    });

    it('should call intercept method for unknown error and open dialog with serverity 1', async () => {
        spyOn(errorsService, "openErrorAsDialog").and.callThrough();
        (service as any).isDialogOpened = false;
        const url = 'http://some/testing';
        const err = new HttpErrorResponse({url: url,error: {severity: 1, application_status_code: "IAM-EXCEPTON-015"}})
        const httpRequest = httpClient.get(url);
        const httpReqPromise = firstValueFrom(httpRequest);
        httpTestingController.expectOne(url).flush(err.error, err);
        try {
            await httpReqPromise;
        } catch(error) {
            expect(error).toBeTruthy();
        }
        expect(errorsService.openErrorAsDialog).toBeTruthy();
    });

    it('should call intercept method for unknown error and open dialog with serverity 3', async () => {
        spyOn(errorsService, "showErrorsInSnackbar").and.callThrough();
        (service as any).isSnackbarOpened = false;
        const url = 'http://some/testing';
        const err = new HttpErrorResponse({url: url,error: {severity: 3, application_status_code: "IAM-EXCEPTON-015"}})
        const httpRequest = httpClient.get(url);
        const httpReqPromise = firstValueFrom(httpRequest);
        httpTestingController.expectOne(url).flush(err.error, err);
        try {
            await httpReqPromise;
        } catch(error) {
            expect(error).toBeTruthy();
        }
        expect(errorsService.showErrorsInSnackbar).toBeTruthy();
    });

    it('should call intercept method for unknown error and open dialog with serverity 4', async () => {
        spyOn(errorsService, "showErrorsInSnackbar").and.callThrough();
        (service as any).isSnackbarOpened = false;
        const url = 'http://some/testing';
        const err = new HttpErrorResponse({url: url,error: {severity: 4, application_status_code: "IAM-EXCEPTON-015"}})
        const httpRequest = httpClient.get(url);
        const httpReqPromise = firstValueFrom(httpRequest);
        httpTestingController.expectOne(url).flush(err.error, err);
        try {
            await httpReqPromise;
        } catch(error) {
            expect(error).toBeTruthy();
        }
        expect(errorsService.showErrorsInSnackbar).toBeTruthy();
    });




});
