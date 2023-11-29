import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {UserProfile} from "../../../shared/models/user-profile/user-profile.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) {
  }

  getUsers(userId: string): Observable<any> {
    const url = `${environment.gdsURL}?q=${userId} `;
    return this.http.get<any>(url);
  }

  loadUserProfile(): Observable<UserProfile> {
    const url = `${environment.userServiceURL}/profiles`;
    return this.http.get<UserProfile>(url)
      .pipe(map((res: UserProfile) => {
        return res;
      }));
  }
}
