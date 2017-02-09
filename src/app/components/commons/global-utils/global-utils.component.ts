import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {Message} from "primeng/primeng";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-global-utils',
  templateUrl: './global-utils.component.html',
  styleUrls: [
    './global-utils.component.css'
  ]
})
export class GlobalUtilsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  @Input('msgs') msgs: Message[] = [];

  showGrowlMessage(event:CustomEvent){
    this.msgs = event.detail;
  }

}
