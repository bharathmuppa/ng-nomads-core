import {Pipe, PipeTransform} from '@angular/core';
import {environment} from "../../../environments/environment";

@Pipe({
  name: 'userImage',
  standalone: true
})
export class UserImagePipe implements PipeTransform {

  transform(userName: string): string {
    if (!userName) {
      return '';
    }
    return encodeURI(`${environment.userImageURL}\\${userName}`);
  }

}
