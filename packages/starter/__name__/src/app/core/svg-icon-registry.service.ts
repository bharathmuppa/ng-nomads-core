import {inject, Injectable} from "@angular/core";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {CUSTOM_SVG_ICON_LIST_TOKEN, CustomSvg} from "./tokens/custom-svg-icons.token";
import {environment} from "../../environments/environment";
import {APP_CONSTANTS} from "./app.constants";

/**
 * Register all your services
 */
@Injectable({
  providedIn: "root"
})
export class SvgIconRegistryService {

  customSvgIcons = inject(CUSTOM_SVG_ICON_LIST_TOKEN);

  constructor(private readonly matIconRegistry: MatIconRegistry, private readonly domSanitizer: DomSanitizer,) {

  }

  registerIcons() {
    this.customSvgIcons.filter((customSvg: CustomSvg) => {
      if (!environment.production) {
        // In Dev environment, no need to check for path safety.
        return true;
      }
      // Ignore the icon path if it doesn't includes <domain>.com in url.
      // probably a security concern
      // TODO: Check the App dynamics logs
      const isSecure = customSvg.path.includes(APP_CONSTANTS.safeSvgURLPattern);
      if (!isSecure) {
        console.error("Svg path is not an secure path");
      }
      return isSecure;
    }).forEach((svgIconRegistry: CustomSvg) => {
      this.matIconRegistry.addSvgIcon(
        svgIconRegistry.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(svgIconRegistry.path)
      );
    });
  }
}

