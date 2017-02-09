import {Component, OnInit, ViewEncapsulation, Input, Output, ViewChild} from "@angular/core";
import {LazyLoadEvent, DataTable} from "primeng/primeng";
import {EventEmitter} from "@angular/forms/src/facade/async";

@Component({
  selector: 'app-fo-data-table',
  templateUrl: './fo-data-table.component.html',
  styleUrls: [
    './fo-data-table.component.css'
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class FoDataTableComponent implements OnInit {

  @Input() value;
  @Input() columns: any[];
  @Input() totalRecords:number;
  @Input() rows:number;
  @Input() pageLinks:number;
  @Input() lazy:boolean = false;
  @Input() paginator:boolean = false;
  @Input() selectionMode:string;      // single, multiple

  @Output() lazyLoadEvent: EventEmitter<LazyLoadEvent> = new EventEmitter<LazyLoadEvent>();
  @Output() onRowSelectEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(DataTable)
  private dataTable: DataTable;

  lazyLoadPage(event: LazyLoadEvent){
    this.lazyLoadEvent.emit(event);
  }

  onRowSelect(event: any){
    this.onRowSelectEvent.emit(event);
  }


  reset(){
    console.log('FoDataTableComponent -> RESET(); ');
    this.dataTable.reset();
  }

  constructor() { }

  ngOnInit() {

  }


}
