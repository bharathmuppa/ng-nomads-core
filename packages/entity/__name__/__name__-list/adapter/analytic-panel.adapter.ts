import {StateCountOverview} from "../../models/state-count-overview";
import {Card, Cards} from "../model/analytic-panel";
import {map, Observable} from "rxjs";

export class AnalyticPanelAdapter {

  public static transform(statusCountOverview: Observable<StateCountOverview>): Observable<Cards> {
    return statusCountOverview.pipe(map(
      (sco) => {
        return sco.state_counts.map(sc => {
          return {
            notificationType: sc.state,
            notificationCount: sc.count,
            notificationTypeLabel: sc.state_label
          } as Card;
        })
      }
    ));
  }

}
