import {MatDrawerMode} from "@angular/material/sidenav";
import {UserProfile} from "../shared/models/user-profile/user-profile.model";

export interface AppState {
  userProfile?: UserProfile ;
  leftSidenavState: Sidenav;
  rightSidenavState: Sidenav;
  activeEntity?: string;
  errors?: Error[];
}


export interface Sidenav {
  isOpened: boolean;
  mode: MatDrawerMode;
  visibility?: SIDENAV_VISIBILITY;
}


export enum SIDENAV_VISIBILITY {
  'COMPACT' = 'COMPACT',
  'COZY' = 'COZY'
}
