import {InjectionToken} from "@angular/core";


export interface CustomSvg {
  name: string;
  path: string;
}


export const CUSTOM_SVG_ICON_LIST_VALUE: CustomSvg[] = [{
  'name': 'shield_blue',
  'path': '../assets/svg/shield_blue.svg'
},
  {
    'name': 'shield_yellow',
    'path': '../assets/svg/shield_yellow.svg'
  }
];

/**
 * Custom SVG INJECTION TOKEN to hold the values of CUSTOM_SVG_ICON_LIST_VALUE and be used across the app.
 */
export const CUSTOM_SVG_ICON_LIST_TOKEN = new InjectionToken<CustomSvg[]>('custom svg icons')
