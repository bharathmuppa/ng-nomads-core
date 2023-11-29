import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AppState, SIDENAV_VISIBILITY} from "../../store/model";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule, MatListModule, MatLineModule, MatMenuModule, MatTooltipModule, RouterLinkActive, RouterLink],
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  @Input()
  expand: SIDENAV_VISIBILITY | undefined;

  protected readonly SIDENAV_VISIBILITY = SIDENAV_VISIBILITY;

  constructor(private readonly appStore: Store<{
    appState: AppState
  }>) {
  }

  addAEntity() {
    // add entity logic here
  }


}
