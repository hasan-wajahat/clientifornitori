import {Component, OnInit, ViewChild} from "@angular/core";
import {MovimentiService} from "../../../services/movimenti/movimenti.service";
import {TranslateService} from "ng2-translate/ng2-translate";
import {CommonService} from "../../../services/common/common.service";
import {MovimentiResponse} from "../../../model/movimenti/movimenti-response";
import { Movimento } from '../../../model/movimenti/movimento';
import {URLSearchParams} from "@angular/http";
import {LazyLoadEvent, Message, DataTable} from "primeng/primeng";
import {Router, ActivatedRoute} from "@angular/router";
import {User} from "../../../model/user/User";

@Component({
  selector: 'app-lista-movimenti',
  templateUrl: './lista-movimenti.component.html',
  styleUrls: ['./lista-movimenti.component.css'],
  providers: [MovimentiService, CommonService]
})
export class ListaMovimentiComponent implements OnInit {


  constructor(private movimentiService: MovimentiService,
              private translateService: TranslateService,
              private commonService: CommonService,
              private router: Router,
              private route: ActivatedRoute) {
        // Inizializzo dati utente
    this.user = JSON.parse(sessionStorage.getItem('UserData'));

  }

  user: User;

  // Proprietà init griglia
  filtroTipo:string = '';
  filtroStato:string = '';
  filtroDal:any;
  filtroAl:any;
  filtroImportoDal:string;
  filtroImportoAl:string;
  filtroCausale:string;
  movimentiResponse: Movimento[];
  movimenti: Movimento[];
  contoId:string;
  today: Date;
  yearRange: string = (new Date().getFullYear() - 30) + ':' + (new Date().getFullYear());
  comingFrom:string = 'show'

  ngOnInit() {
    // inizializzo le colonne della griglia
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['contoId'] != null) {
        this.contoId = params['contoId'];
        CommonService.logDebug("CONTOID: " + params['contoId']);
      }
      if (params['comingFrom'] != null) {
        this.comingFrom = params['comingFrom'];
        CommonService.logDebug("COMINGFROM: " + params['comingFrom']);
      }

    });
    this.today = new Date();
    this.inizializzaCalendar();
    let params: URLSearchParams = new URLSearchParams();
    params.set('contoId', this.contoId);
    this.loadMovimenti(params);
  }

  
  backToComingFrom(){
    if (this.comingFrom == 'list'){
      this.router.navigate([`/home/conti/lista-conti`]);
    }
    else {
      let contoId = this.contoId
      this.router.navigate([`/home/conti/modifica-conto/${contoId}`]);
    }
  }  

  addMovimento() {
    let contoId = this.contoId
    this.router.navigate([`/home/movimenti/modifica-movimento/${contoId}`]);
  }

  displayError(error: string) {
    let msgs: Message[];
    msgs = [];
    msgs.push({ severity: 'error', summary: 'Si è verificato un Errore !', detail: error });
    this.commonService.showGrowlMessage(msgs);
  }

  /**
   * Function richiamata dalla paginazione
   * @param event
   */
  loadPageMovimenti(event: LazyLoadEvent ) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('contoId', this.contoId);
    this.loadMovimenti(params);
  }

  loadMovimenti( params: URLSearchParams ) : void {

    this.commonService.showBusy();

    this.movimentiService.getListaMovimenti(params).subscribe(
      movimentiResponse => this.movimentiResponse = movimentiResponse,
      error => {
        this.displayError(error);
        this.commonService.hideBusy();
      },
      () => {
        console.log("movimentiResponse.getListaMovimenti() - FINISHED! " );
        console.log("this.movimentiResponse: "+ this.movimentiResponse)
        let movimentiDTOArray = []
        this.movimentiResponse.forEach((movimento)=> {
          let movimentoDTO = Object.assign(new Movimento(), movimento)
          movimentoDTO.buildLabels()
          movimentiDTOArray.push(movimentoDTO)
        })

        this.movimenti = movimentiDTOArray;
        this.commonService.hideBusy();
      }
    );

  }

  searchMovimenti() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('contoId', this.contoId);
    params.set('tipo', this.filtroTipo);
    params.set('stato', this.filtroStato);
    params.set('causale', this.filtroCausale);
    if (this.filtroDal){
      params.set('dal', this.filtroDal.toLocaleFormat('%Y/%m/%d'));
    }
    if (this.filtroAl){
      params.set('al', this.filtroAl.toLocaleFormat('%Y/%m/%d'));
    }
    params.set('importoDal', this.filtroImportoDal);
    params.set('importoAl', this.filtroImportoAl);

    console.log('PARAMS: ' + params.toString());

    this.loadMovimenti(params);

  }

  onRowSelect(event){
    CommonService.logInfo("SELEZIONATA: " + event.data.id);
    let contoId = event.data.contoId
    let id = event.data.id
    this.router.navigate([`/home/movimenti/modifica-movimento/${contoId}/${id}`]);
  }

  it: any;
  inizializzaCalendar(){
    this.it = {
      firstDayOfWeek: 0,
      dayNames: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
      dayNamesMin: ["Do","Lu","Ma","Me","Gi","Ve","Sa"],
      monthNames: [ "Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre" ],
      monthNamesShort: [ "Gen", "Feb", "Mar", "Apr", "Mag", "Giu","Lug", "Ago", "Set", "Ott", "Nov", "Dic" ]
    };
  }

}
