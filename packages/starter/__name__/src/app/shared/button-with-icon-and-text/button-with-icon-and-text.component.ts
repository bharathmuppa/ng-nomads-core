import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatLineModule} from "@angular/material/core";

@Component({
  selector: 'app-button-with-icon-and-text',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, MatLineModule],
  templateUrl: './button-with-icon-and-text.component.html',
  styleUrls: ['./button-with-icon-and-text.component.scss']
})
export class ButtonWithIconAndTextComponent {

  @Input()
  isExpanded?: boolean;
}
