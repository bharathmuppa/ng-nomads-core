import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "./model";

export const appFeature = createFeatureSelector<AppState>('appState');
export const leftMenuState = createSelector(appFeature, (state) => state.leftSidenavState);

export const rightMenuState = createSelector(appFeature, (state) => state.rightSidenavState);

export const userProfileState = createSelector(appFeature, (state) => state.userProfile);
