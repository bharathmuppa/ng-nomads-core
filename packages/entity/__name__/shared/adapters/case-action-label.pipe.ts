import {Pipe, PipeTransform} from "@angular/core";
import {CASE_ACTION_CONFIGS} from "../../models/case-actions.model";

@Pipe({
  name: 'caseActionLabel',
  standalone: true
})
export class CaseActionLabelPipe implements PipeTransform {

  public transform(caseActionName: string): string {
    return CaseActionLabelPipe.convertCaseActionNameToLabel(caseActionName);
  }

  public static convertCaseActionNameToLabel(caseActionName: string) {
   return CASE_ACTION_CONFIGS[caseActionName].label;
  }
}
