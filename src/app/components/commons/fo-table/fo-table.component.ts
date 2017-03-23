import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {TreeNode} from "./TreeNode";

@Component({
  selector: 'app-fo-table',
  templateUrl: './fo-table.component.html',
  styleUrls: ['./fo-table.component.css']
})
export class FoTableComponent implements OnInit {

  constructor() { }

  @Input() value:TreeNode[];
  @Input() sorted:TreeNode[];
  @Input() columns: any[];

  @Output() onRowSelectEvent: EventEmitter<any> = new EventEmitter<any>();

  sortField:string;
  sortDirection:string;

  ngOnInit() {
  }

  toggleRow(row: TreeNode, event: Event): void {
    for (let curNode of row.children){
      curNode.expanded = !curNode.expanded;
    }

    let att:Attr = ( (event.currentTarget as HTMLTableColElement).firstElementChild as HTMLButtonElement).attributes.getNamedItem('class');
    if(att.value.indexOf('fa-caret-right') > 0){
      att.value = "fa fa-caret-down";
    }
    else{
      att.value = "fa fa-caret-right";
    }

  }

  onRowSelect(event:TreeNode){
    this.onRowSelectEvent.emit(event);
  }

  sortDataset(field:string){

    if( !this.sortField ){
      this.sortDirection = 'DESC'
    }
    else if(this.sortField != field){
      this.sortDirection = 'DESC'
    }
    else{
      if(this.sortDirection == 'DESC'){
        this.sortDirection = 'ASC';
      }
      else{
        this.sortDirection = 'DESC';
      }
    }

    this.sortField = field;

    console.log("SORT field: " + field + " Direction: " + this.sortDirection);

    if(this.sortDirection == 'ASC'){
      this.sorted = this.value.sort( function(obj1, obj2) {
        if ( obj1.data[field] < obj2.data[field] ){
          return -1;
        }else if( obj1.data[field] > obj2.data[field] ){
          return 1;
        }else{
          return 0;
        }
      });
    }
    else{
      this.sorted = this.value.sort( function(obj1, obj2) {
        if ( obj1.data[field] > obj2.data[field] ){
          return -1;
        }else if( obj1.data[field] < obj2.data[field] ){
          return 1;
        }else{
          return 0;
        }
      });
    }

    console.log("SORTED: " + JSON.stringify(this.sorted));
    this.value = this.sorted;

  }

  getClassIconSortDirection(field){

    if(!this.sortDirection){
      return 'fa fa-fw fa-sort';
    }

    if(this.sortField == field){
      if(this.sortDirection == 'DESC'){
        return 'fa fa-fw fa-sort-asc';
      }
      else if(this.sortDirection == 'ASC'){
        return 'fa fa-fw fa-sort-desc';
      }
      else{
        return 'fa fa-fw fa-sort';
      }
    }
    else{
      return "fa fa-fw fa-sort";
    }

  }

}
