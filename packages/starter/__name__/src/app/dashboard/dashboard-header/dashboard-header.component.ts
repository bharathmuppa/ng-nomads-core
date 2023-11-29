import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatToolbarModule} from "@angular/material/toolbar";
import {UserProfile} from "../../shared/models/user-profile/user-profile.model";
import {UserImagePipe} from "../../shared/pipes/user-image.pipe";

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatToolbarModule, NgOptimizedImage, UserImagePipe],
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent {
  @Input({
    required: true
  })
  userProfile: UserProfile | undefined;
}
