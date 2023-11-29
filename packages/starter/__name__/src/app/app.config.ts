import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi
} from "@angular/common/http";
import {provideRouter, withComponentInputBinding} from "@angular/router";
import {provideStore} from "@ngrx/store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {APP_INITIALIZER, importProvidersFrom} from "@angular/core";

import {MatDialogModule} from "@angular/material/dialog";

import {appStoreReducer} from "./store/reducers";
import {environment} from "../environments/environment";
import {APP_ROUTES} from "./app.routing";
import {initializeApp} from "./core/app-initializers/logger";
import {AuthorizationInterceptor} from "./core/interceptors/authorization.interceptor";
import {
  BOOLEAN_API_OPTION_VALUE,
  BOOLEAN_API_OPTIONS_TOKEN
} from "./core/tokens/boolean-api.token";
import {CUSTOM_SVG_ICON_LIST_TOKEN, CUSTOM_SVG_ICON_LIST_VALUE} from "./core/tokens/custom-svg-icons.token";

export const APP_CONFIG = {
  providers: [
    // Add Store as Provider.
    provideStore({appState: appStoreReducer}),
    // Store dev tools configuration
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !environment.production,
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),

    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withInterceptorsFromDi()),
    // withComponentInputBinding, Enables binding information from the Router state directly to the inputs of the component in Route configurations.
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    // As We are using dialog in almost all application, it is preferred to add this as Provider at Root level
    importProvidersFrom(MatDialogModule),
    // APP Levels providers will be added here...
    {
      provide: APP_INITIALIZER,
      useFactory: () => initializeApp,
      multi: true,
      deps: [],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
    {
      provide: BOOLEAN_API_OPTIONS_TOKEN,
      useValue: BOOLEAN_API_OPTION_VALUE
    },
    {
      provide: CUSTOM_SVG_ICON_LIST_TOKEN,
      useValue: CUSTOM_SVG_ICON_LIST_VALUE
    }
  ],

};
