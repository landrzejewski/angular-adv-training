import {Component, input, model, output} from '@angular/core';

@Component({
  selector: 'app-ui-example',
  standalone: true,
  imports: [],
  templateUrl: './ui-example.component.html',
  styleUrl: './ui-example.component.css'
})
export class UiExampleComponent {

  value = input.required<number>();

  outputValue = output<string>()

  twoWayValue = model<boolean>();

}
