import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SIDENAV_VISIBILITY} from "../../store/model";

@Component({
  selector: 'app-event-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './event-menu.component.html',
  styleUrls: ['./event-menu.component.scss']
})
export class EventMenuComponent {
  @Input()
  expand: SIDENAV_VISIBILITY | undefined = SIDENAV_VISIBILITY.COZY;
}
