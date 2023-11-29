import {createReducer, on} from '@ngrx/store';
import {AppState, SIDENAV_VISIBILITY} from "./model";
import {appActions, userProfileActions} from "./actions";

export const initialAppState: AppState = {
  leftSidenavState: {
    isOpened: true,
    mode: 'side',
    visibility: SIDENAV_VISIBILITY.COZY
  },
  rightSidenavState: {
    isOpened: false,
    mode: 'side'
  }
};

export const appStoreReducer = createReducer(
  initialAppState,
  on(appActions.menuClicked, (state: AppState) => {
    return {
      ...state, ...{
        leftSidenavState: {
          ...state.leftSidenavState,
          // toggle the state of menu
          visibility: state.leftSidenavState.visibility === SIDENAV_VISIBILITY.COMPACT ? SIDENAV_VISIBILITY.COZY : SIDENAV_VISIBILITY.COMPACT
        }
      }
    }
  }),
  on(userProfileActions.userProfileLoaded, (state, userProfile) => ({
    ...initialAppState,
    ...{userProfile: userProfile.userProfile}
  })),
  on(appActions.resetRequested, (state) => ({...initialAppState})),
);



