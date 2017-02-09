import {Component, Input, ViewEncapsulation} from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-loading-indicator',
  templateUrl: 'loading-indicator.component.html',
  styleUrls: [
    'loading-indicator.component.css'
  ]
})
export class LoadingIndicatorComponent {

  @Input('displayBusy') display: boolean = false;

  showDialog() {
    this.display = true;
  }

  hideDialog() {
    this.display = false;
  }
}
