import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';

import {map, Observable} from "rxjs";
import {select, Store} from "@ngrx/store";

import {userProfileState} from "../store/selectors";
import {AppState} from "../store/model";
import {DashboardHeaderComponent} from "./dashboard-header/dashboard-header.component";
import {UserProfile} from "../shared/models/user-profile/user-profile.model";

/**
 * Dashboard component is composition of all statistics, quick actions for users with specific access.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  userProfile$?: Observable<UserProfile | undefined>;

  constructor(private store: Store<AppState>) {
    this.listenToUserProfileChanges();
  }

  /**
   * Listen to User profile Changes
   * @private
   */
  private listenToUserProfileChanges() {
    this.userProfile$ = this.store.pipe(select(userProfileState), map((userProfile) => {
      return userProfile;
    }))
  }
}
