import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-fo-collapsible-bar',
  templateUrl: './fo-collapsible-bar.component.html',
  styleUrls: ['./fo-collapsible-bar.component.css']
})
export class FoCollapsibleBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input('headerText') headerText:string = "";
}
