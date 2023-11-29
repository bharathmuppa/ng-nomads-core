import {createActionGroup, emptyProps} from "@ngrx/store";
import {UserProfile} from "../shared/models/user-profile/user-profile.model";


export const appActions = createActionGroup({
  source: 'App Page',
  events: {
    // defining Entitys Loaded Event with Props factory
    'Menu Clicked': emptyProps(),

    // defining an event to notify entitys are being fetched
    'Reset Requested': emptyProps(),

    // Add Entity
    'Create Entity': emptyProps()
  },
});

export const userProfileActions = createActionGroup({
  source: 'App User Profile',
  events: {
    // defining Entitys Loaded Event with Props factory
    'User profile Loaded': (userProfile: UserProfile)=>({userProfile}),
  },
});



