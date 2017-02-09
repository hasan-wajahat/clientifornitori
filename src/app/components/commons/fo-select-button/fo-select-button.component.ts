import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {SelectItem} from "primeng/primeng";

@Component({
  selector: 'app-fo-select-button',
  templateUrl: './fo-select-button.component.html',
  styleUrls: [
    './fo-select-button.component.css',
    '../../../../../node_modules/primeng/resources/themes/omega/theme.css',
    '../../../../../node_modules/primeng/resources/primeng.min.css',
    '../../../styles/font-awesome.min.css'
  ],
  encapsulation:ViewEncapsulation.Native
})
export class FoSelectButtonComponent implements OnInit {

  constructor() { }

  filterOptions: SelectItem[];
  selectedFilterOption: string;


  ngOnInit() {
    this.filterOptions = [];
    this.filterOptions.push({label:'Cliente', value:'C'});
    this.filterOptions.push({label:'Fornitore', value:'F'});

    this.selectedFilterOption = "C";
  }

  printValue() {
    console.log('SELECTED: ' + this.selectedFilterOption);
  }

}
