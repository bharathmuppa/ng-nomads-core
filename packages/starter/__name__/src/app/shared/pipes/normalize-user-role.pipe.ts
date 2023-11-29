import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'normalizeUserRole',
  standalone: true
})
export class NormalizeUserRolePipe implements PipeTransform {

  transform(systemRole: string): string {
    return this.getDisplayedRole(systemRole);
  }

  getDisplayedRole(systemRole: string): string {
    let displayedRole = "";

    switch (systemRole) {
      case 'change-specialist-1' :
        displayedRole = 'Change Specialist 1';
        break;
      case 'change-specialist-2' :
        displayedRole = 'Change Specialist 2';
        break;
      case 'change-specialist-3' :
        displayedRole = 'Change Specialist 3';
        break;
      case 'data-screener' :
        displayedRole = 'Data Screener';
        break;
      case 'administrator' :
        displayedRole = 'Administrator';
        break;
      case 'member' :
        displayedRole = 'Member';
        break;
      case 'user' :
        displayedRole = 'User';
        break;
    }

    return displayedRole;
  }

}
