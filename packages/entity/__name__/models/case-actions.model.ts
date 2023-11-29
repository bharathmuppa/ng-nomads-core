export interface CaseAction {
  mandatory_properties_regexps: string[];
  case_action: string;
  is_allowed: boolean;
  mandatory_properties_spel: string[];
  filter: string;
}

export type CaseActions = CaseAction[];

export interface CaseActionDetail {
  property: string;
  propertyLabel: string;
}
export interface CaseActionConfig {
  name: string;
  label: string;
  isSystem: boolean;
  payload: CaseActionDetail | undefined;
}
export interface CaseActionConfigMap {
  [key: string]: CaseActionConfig;
}
export const CASE_ACTION_CONFIGS = {
  //TODO: Fill in your case actions as below
  // CREATE : { name: 'CREATE', 'label': 'Create', isSystem: true, payload: undefined},
} as CaseActionConfigMap;

export interface CaseProperty {
  unreadable_property_regexps: string[];
  readable_property_regexps: string[];
  unupdatable_property_regexps: string[];
  updatable_property_regexps: string[];
}

export type CaseProperties = CaseProperty;
export interface CasePermission {
  case_actions: CaseActions;
  case_properties: CaseProperties;
}

export interface CaseActionCompleted {
  id: number;
  status: number;
  status_label: string;
  case_permissions: CasePermission;
}
