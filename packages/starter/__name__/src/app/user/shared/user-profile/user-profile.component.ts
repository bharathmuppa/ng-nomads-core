import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {NormalizeUserRolePipe} from "../../../shared/pipes/normalize-user-role.pipe";
import {UserProfile} from "../../../shared/models/user-profile/user-profile.model";
import {UserImagePipe} from "../../../shared/pipes/user-image.pipe";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatButtonModule, MatListModule, NormalizeUserRolePipe, NgOptimizedImage, UserImagePipe, MatIconModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {
  @Input({
    required: true
  })
  userProfile?: UserProfile;
  roles: string[] = [];
  groups: string[] = [];


  logout(): void {
    // logout logic
    // Delete all cookies (Check this)
    // Call logout api (Configuration service)
  }

}
