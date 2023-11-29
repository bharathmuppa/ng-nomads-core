import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {Sidenav, SIDENAV_VISIBILITY} from "../../store/model";

@Component({
  selector: 'app-body',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatSidenavModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  @Input({required: true})
  public leftMenuState?: Sidenav;

  @Input({required: true})
  public rightMenuState?: Sidenav;

  protected readonly SIDENAV_VISIBILITY = SIDENAV_VISIBILITY;
}
