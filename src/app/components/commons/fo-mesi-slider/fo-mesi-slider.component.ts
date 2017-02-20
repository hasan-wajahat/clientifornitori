import {Component, OnInit, Input, Output, EventEmitter,animate,transition,style,state,trigger} from '@angular/core';
import {Mese} from "../../corrispettivi/corrispettivimese";
import {CountMese} from "../../corrispettivi/countcorrispettivimese";


@Component({
  selector: 'app-fo-mesi-slider',
  templateUrl: './fo-mesi-slider.component.html',
  styleUrls: ['./fo-mesi-slider.component.css'],
  /*
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ])
    ])
  ]*/
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



  istTempo=new Date();
  annoOra=this.istTempo.getFullYear();
  meseOra=this.istTempo.getMonth();




  constructor(){ }

  annoPrima(){
    this.backClick.emit(null);
  }

  annoDopo(){
    this.forwClick.emit(null);
  }


  getCurrMese(mese:number,clickable:boolean){
    if(clickable==true) {
      this.selezioneAnno.emit(mese);
    }
  }




  ngOnInit(){

  }

}
