import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

/**
 * Dashboard Service to get data from specific api and other dashboard component related core logics goes here
 * TODO: Replace this Documentation with more specific context
 */
@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(private readonly http: HttpClient) {
  }

}
