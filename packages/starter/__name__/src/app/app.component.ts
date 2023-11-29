import {ChangeDetectionStrategy, Component, DestroyRef} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {RouterOutlet} from "@angular/router";

import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

import {leftMenuState, rightMenuState} from "./store/selectors";
import {HeaderComponent} from "./layout/header/header.component";
import {BodyComponent} from "./layout/body/body.component";
import {NavMenuComponent} from "./layout/nav-menu/nav-menu.component";
import {EventMenuComponent} from "./layout/event-menu/event-menu.component";
import {AppState, Sidenav} from "./store/model";
import {userProfileActions} from "./store/actions";
import {SvgIconRegistryService} from "./core/svg-icon-registry.service";
import {UserService} from "./user/core/api/user.service";
import {APP_CONSTANTS} from "./core/app.constants";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    HeaderComponent,
    BodyComponent,
    NavMenuComponent,
    RouterOutlet,
    EventMenuComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  title = APP_CONSTANTS.projectName;
  leftMenuState: Sidenav = {} as Sidenav;
  rightMenuState: Sidenav = {} as Sidenav;

  constructor(private readonly appStore: Store<{
    appState: AppState
  }>, private destroyRef: DestroyRef, private userService: UserService, private svgIconRegistryService: SvgIconRegistryService) {
    this.listenToLeftMenuChanges();
    this.listenToRightMenuChanges();
    // step to load all the svg icons
    this.svgIconRegistryService.registerIcons();
    // Load user Profile
    this.getUserProfile();
  }


  listenToLeftMenuChanges() {
    this.appStore.pipe(select(leftMenuState), takeUntilDestroyed(this.destroyRef)).subscribe((value: Sidenav) => {
      this.leftMenuState = value;
    });
  }

  listenToRightMenuChanges() {
    this.appStore.pipe(select(rightMenuState), takeUntilDestroyed(this.destroyRef)).subscribe((value: Sidenav) => {
      this.rightMenuState = value;
    });
  }

  getUserProfile() {
    this.userService.loadUserProfile().pipe(takeUntilDestroyed()).subscribe((userProfile) => {
      this.appStore.dispatch(userProfileActions.userProfileLoaded(userProfile));
    })
  }
}
