import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {select, Store} from "@ngrx/store";
import {UserProfileComponent} from "../../user/shared/user-profile/user-profile.component";
import {AppState} from "../../store/model";
import {appActions} from "../../store/actions";
import {userProfileState} from "../../store/selectors";
import {UserProfile} from "../../shared/models/user-profile/user-profile.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, UserProfileComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  title: string = '';

  userProfile$?: Observable<UserProfile|undefined>;

  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {
    this.listenToUserProfileChanges();
  }

  private listenToUserProfileChanges() {
    this.userProfile$ = this.store.pipe(select(userProfileState));
  }

  toggleMenu() {
    this.store.dispatch(appActions.menuClicked());
  }
}
