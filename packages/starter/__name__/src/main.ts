import {bootstrapApplication} from "@angular/platform-browser";

import {AppComponent} from "./app/app.component";
import {APP_CONFIG} from "./app/app.config";

/**
 *  This is New way of bootstrapping as of ng16 for standalone components setup,
 * {@link https://angular.io/guide/standalone-components} For more details
 **/


bootstrapApplication(AppComponent, APP_CONFIG).then((ng) => {
  // Add Some logic here, which will triggered on Angular initialization.
});
