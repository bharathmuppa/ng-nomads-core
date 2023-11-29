import {InjectionToken} from "@angular/core";

/**
 * Contract for Boolean value representation.
 */
interface BooleanApiToken {
  label: string,
  value: boolean
}

/**
 * Token to hold Boolean Values and There representation in MIRAI Apps
 * In General all true or false vale input fields need this conversations.
 * value should be true or false,but visually we need to show it as Yes or No
 */
export const BOOLEAN_API_OPTIONS_TOKEN = new InjectionToken<BooleanApiToken[]>('booleanApiOptions');
export const BOOLEAN_API_OPTION_VALUE:BooleanApiToken[] = [{
  label: 'Yes',
  value: true
}, {
  label: 'No',
  value: false
}];
