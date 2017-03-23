import {Component, OnInit, ViewChild} from "@angular/core";
import {ClientiFornitoriService} from "../../../services/clientifornitori/clientifornitori.service";
import {TranslateService} from "ng2-translate/ng2-translate";
import {CommonService} from "../../../services/common/common.service";
import {ClientiFornitoriResponse} from "../../../model/clientifornitori/ClientiFornitoriResponse";
import {CliFor} from "../../../model/clientifornitori/CliFor";
import {URLSearchParams} from "@angular/http";
import {LazyLoadEvent, Message} from "primeng/primeng";
import {EnumCliForFilter} from "../../../model/clientifornitori/EnumCliForFilter";
import {FoDataTableComponent} from "../../commons/fo-data-table/fo-data-table.component";
import {Router} from "@angular/router";
import {User} from "../../../model/user/User";

@Component({
  selector: 'app-lista-clientifornitori',
  templateUrl: './lista-clientifornitori.component.html',
  styleUrls: ['./lista-clientifornitori.component.css'],
  providers: [ClientiFornitoriService, CommonService]
})
export class ListaClientifornitoriComponent implements OnInit {

  @ViewChild(FoDataTableComponent)
  private foDataTableComponent: FoDataTableComponent;

  constructor(private _clientiFornitoriService: ClientiFornitoriService, private translateService: TranslateService, private _commonService: CommonService, private router:Router) {
    this.headerDenominazione = this.translateService.instant('CLIENTIFORNITORI.DATATABLE.HEADER.DENOMINAZIONE');

    // Inizializzo dati utente
    this.user = JSON.parse(sessionStorage.getItem('UserData'));

  }

  user:User;

    // Proprietà init griglia
  clientiFornitoriResponse:ClientiFornitoriResponse;
  clientiFornitori: CliFor[];
  cols: any[];
  totalRecords: number = 0;
  rows = "20"; // Righe per pagina

  // Proprietà filtri selezionati
  stato:string = '';
  pIVARagionesociale:string = '';
  tipologia:string = '';

  // Proprietà di binding campi filtro
  filtroAttivi:string = '';
  filtroCliFor:string = '';
  textFilter:string = '';

  // Proprietà header tabella per quando useremo MULTILINGUA
  headerDenominazione:string = 'DENOMINAZIONE';
  headerPivaCodFisc:string = 'PARTITA IVA/C.F.';


  ngOnInit() {

    // inizializzo le colonne della griglia
    this.initFoDataGrid();
    // inizializzo il pulsante filtro -> Clienti/Fornitori
    this.initPageFilters();

  }

  /**
   * Function richiamata dal pulsante SEARCH
   */
  searchClientiFornitori() {

    this.stato = this.filtroAttivi;
    this.pIVARagionesociale = this.textFilter;
    this.tipologia = this.filtroCliFor;

    let params: URLSearchParams = new URLSearchParams();
    params.set('username',  this.user.username);
    params.set('stato', this.stato);
    params.set('pIVARagioneSociale', this.pIVARagionesociale);
    params.set('tipologia', this.tipologia);
    params.set('offset', '1');
    params.set('limit', this.rows);
    params.set('field',  EnumCliForFilter.getValue('intestazioneCognomeNome'));
    params.set('type', '1');

    console.log('PARAMS: ' + params.toString());

    this.loadClientiFornitori(params);
    this.foDataTableComponent.reset();

  }

  /**
   * Function richiamata dalla paginazione
   * @param event
   */
  loadPageClientiFornitori(event: LazyLoadEvent ) {

    console.log("Event first: " + event.first);
    console.log("Event rows: " + event.rows);
    console.log("Event sort field: " + event.sortField);
    console.log("Event sort order " + event.sortOrder);

    let params: URLSearchParams = new URLSearchParams();
    params.set('username', this.user.username);
    params.set('stato', this.stato);
    params.set('pIVARagioneSociale', this.pIVARagionesociale);
    params.set('tipologia', this.tipologia);
    params.set('offset', (event.first + 1).toString());
    params.set('limit', event.rows.toString());
    params.set('field', EnumCliForFilter.getValue(event.sortField));
    params.set('type', event.sortOrder.toString());

    console.log("loadPageClientiFornitori - PARAMS: " + params.toString());

    this.loadClientiFornitori(params);

  }

  /**
   * Questa function richiama il servizio per la lista dei Clienti/Fornitori
   * @param params
   */
  loadClientiFornitori( params: URLSearchParams ) : void {

    this._commonService.showBusy();

    this._clientiFornitoriService.getListaClientiFornitori(params).subscribe(
      clientiFornitoriResponse => this.clientiFornitoriResponse = clientiFornitoriResponse,
      error => {
        this.displayError(error);
        this._commonService.hideBusy();
      },
      () => {
        console.log("_clientiFornitoriService.getListaClientiFornitori() - FINISHED! " );
        this.clientiFornitori = this.clientiFornitoriResponse.list;
        this.totalRecords = this.clientiFornitoriResponse.total;
        this._commonService.hideBusy();
      }
    );

  }

  /**
   * Inizializzo le colonne della griglia
   */
  initFoDataGrid(){
    this.cols = [
      {field: 'intestazioneCognomeNome',   header: "DENOMINAZIONE",		  sortable:'true', style: {'text-align':'center'}},
      {field: 'pIvaCf',          header: 'PARTITA IVA/C.F.',	sortable:'true', style: {'text-align':'center'}},
      {field: 'email',           header: 'MAIL',	            sortable:'true', style: {'text-align':'center'}},
      {field: 'indirizzo', 		   header: 'INDIRIZZO',			    sortable:'true', style: {'text-align':'center'}},
      {field: 'citta', 	         header: "CITTA'",		        sortable:'true', style: {'text-align':'center'}}
    ];
  }

  initPageFilters(){

  }

  addClienteFornitore(tipo:string){
    this.router.navigate(['/home/clientifornitori/modifica-cliente-fornitore',{ tipoCf: tipo }]);
  }

  displayError(error:string){
    // let msgs: Message[];
    // msgs = [];
    // msgs.push({severity:'info', summary:'Attenzione.', detail:'Funzione di inserimento non ancora disponibile!'});
    // msgs.push({severity:'warn', summary:'Attenzione.', detail:'Funzione di inserimento non ancora disponibile!'});
    // msgs.push({severity:'error', summary:'Attenzione.', detail:'Funzione di inserimento non ancora disponibile!'});
    // this._commonService.showGrowlMessage(msgs);

    let msgs: Message[];
    msgs = [];
    msgs.push({severity:'error', summary:'Si è verificato un Errore !', detail:error});
    this._commonService.showGrowlMessage(msgs);
  }


  onRowSelectEvent(selectedRow:any){
     this.router.navigate(['/home/clientifornitori/modifica-cliente-fornitore', selectedRow.data.id]);
  }
}
