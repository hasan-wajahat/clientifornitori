import {Component, OnInit, Input, Output, EventEmitter,animate,transition,style,state,trigger} from '@angular/core';
import {Mese} from "../../corrispettivi/corrispettivimese";
import {CountMese} from "../../corrispettivi/countcorrispettivimese";
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../../services/common/common.service";


@Component({
  selector: 'app-fo-mesi-slider',
  templateUrl: './fo-mesi-slider.component.html',
  styleUrls: ['./fo-mesi-slider.component.css'],
})
export class FoMesiSliderComponent implements OnInit {

  @Input() mesi:Mese[] = [];
  @Input() countmesi:CountMese[] = [];
  @Output() backClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() forwClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() selezioneAnno: EventEmitter<any> = new EventEmitter<any>();
  @Input() normalMoveStyle:boolean;
  @Input() disabledMoveStyleLeft:boolean;
  @Input() disabledMoveStyleRight:boolean;
  @Input() hideConfirmedLock:string;


  selMese:number;
  selAnno:number;
  istTempo=new Date();
  annoOra=this.istTempo.getFullYear();
  meseOra=this.istTempo.getMonth();




  constructor(private route:ActivatedRoute,private _commonService:CommonService,){ }

  ngOnInit(){

    this.route.params.subscribe(params => {
      CommonService.logDebug("PARAMS: " + JSON.stringify(params));

      if(params.hasOwnProperty('selMese') && params.hasOwnProperty('selAnno')){
        this.selMese = +params['selMese'];
        this.selAnno = +params['selAnno'];

      }

    });



  }


  annoPrima(){
    this.backClick.emit(null);
  }

  annoDopo(){
    this.forwClick.emit(null);
  }


  getCurrMese(mese:number,clickable:boolean,locked:string){
    if(clickable==true){
      this.selezioneAnno.emit({mese:mese,lockd:locked});
    }
  }






}
