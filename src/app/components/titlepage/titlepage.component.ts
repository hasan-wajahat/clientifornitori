import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-titlepage',
  templateUrl: 'titlepage.component.html',
  styleUrls: ['titlepage.component.css']
})
export class TitlepageComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  @Input('pageTitle') pageTitle:string;
  @Input('navPageName') navPageName:string;

}
