import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'titleCaseText',
  standalone: true
})
export class TitleCaseTextPipe implements PipeTransform {


  public transform(text: string): string {
    text = text.replaceAll(/([A-Z])/g, ' $1').trim()
    text = text.replaceAll("_", ' ');
    let splitText = text.toLowerCase().split(' ');
    for (let i = 0; i < splitText.length; i++) {
      splitText[i] = splitText[i].charAt(0).toUpperCase() + splitText[i].substring(1);
    }
    return splitText.join(' ');
  }

}
