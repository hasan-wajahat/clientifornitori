import {Component, OnInit} from "@angular/core";
import {Router, Params, ActivatedRoute} from "@angular/router";
import {CliFor} from "../../../model/clientifornitori/CliFor";
import {ClientiFornitoriService} from "../../../services/clientifornitori/clientifornitori.service";
import {CommonService} from "../../../services/common/common.service";
import {Message, ConfirmationService} from "primeng/primeng";
import {CodeVAT} from "../../../model/clientifornitori/CodeVAT";
import {URLSearchParams} from "@angular/http";
import {User} from "../../../model/user/User";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ModificaClienteFornitoreForms} from "./modifica-cliente-fornitore.forms";
import {DateFormatter} from "@angular/common/src/pipes/intl";

@Component({
  selector: 'app-modifica-cliente-fornitore',
  templateUrl: './modifica-cliente-fornitore.component.html',
  styleUrls: [
    './modifica-cliente-fornitore.component.css'
  ],
  providers: [ClientiFornitoriService, CommonService]
})

export class ModificaClienteFornitoreComponent implements OnInit {

  constructor(private _router:Router,
              private route:ActivatedRoute,
              private _clientiFornitoriService:ClientiFornitoriService,
              private _commonService:CommonService,
              private _confirmationService:ConfirmationService,
              private fb: FormBuilder
              )
  {  }


  cliForDTO:CliFor;
  listaCodiciIVA:CodeVAT[];
  cliForSaveResponse:any;
  userData:User;
  today:Date;
  formDatiClienteFornitore:FormGroup;

  formErrors = ModificaClienteFornitoreForms.formErrors;
  validationMessages = ModificaClienteFornitoreForms.validationMessages;

  submitted:boolean = false;


  ngOnInit() {
    this.today = new Date();
    CommonService.logDebug("Inizializzo con dati default!");

    this.userData = <User> JSON.parse(sessionStorage.getItem("UserData"));
    this.inizializzaCalendar();

    // TODO: Per tutte le costanti creare ed usare ENUMERATO come da BACK-END
    this.cliForDTO = new CliFor();
    this.cliForDTO.tipo = "PERSONA_FISICA";
    this.cliForDTO.tipoTerminiPagamento = "DATA_DALLA_FATTURA";
    this.cliForDTO.stato = "ATTIVO";
    this.cliForDTO.tipoCF = "CLIENTE";
    this.cliForDTO.userId = this.userData.id;
    this.cliForDTO.codiciIVA = -1;

    this.route.params.subscribe(params => {
      CommonService.logDebug("PARAMS: " + JSON.stringify(params));

      // Passaggio parametri nuovo modo
      if( params['tipoCf'] != null ){
        this.cliForDTO.tipoCF = params['tipoCf'];
        CommonService.logDebug("TIPO CF: " + params['tipoCf']);
      }
    });


    this.route.params.forEach((params: Params) => {
      // Passaggio parametri vecchio modo
      let id = +params['id']; // (+) converts string 'id' to a number
      CommonService.logDebug("CLIFOR ID: " + id);
      if(!isNaN(id)){
        this.getClienteFornitore(String(id));
      }
    });

    CommonService.logDebug("BUILD FORM!!!");
    this.buildForm();
  }

  buildForm(): void {

    // Recupero i codici IVA
    this.getCodiciIva();

    this.formDatiClienteFornitore = ModificaClienteFornitoreForms.buildFormDatiClienteFornitore(this.cliForDTO, this.fb);

    this.formDatiClienteFornitore.valueChanges
      .subscribe(data => CommonService.onValueChanged(data, this.formDatiClienteFornitore, this.formErrors, this.validationMessages, this.submitted));


    this.formDatiClienteFornitore.controls['partitaIVA'].clearValidators();
    this.formDatiClienteFornitore.controls['ragioneSociale'].clearValidators();
    this.formDatiClienteFornitore.controls['denominazione'].clearValidators();

  }

  rigeneraForm(){
    // Bug Angular 2  - Serve solo per far reinizializzare i controls
    this.formDatiClienteFornitore.setControl('codiceFiscale',this.formDatiClienteFornitore.controls['codiceFiscale']);
  }

  changeFormaGiuridica(event){

    if(event.target.value == 'PERSONA_FISICA'){
      this.formDatiClienteFornitore.controls['partitaIVA'].clearValidators();
      this.formDatiClienteFornitore.controls['ragioneSociale'].clearValidators();
      this.formDatiClienteFornitore.controls['denominazione'].clearValidators();

      this.formDatiClienteFornitore.controls['nome'].setValidators(Validators.required);
      this.formDatiClienteFornitore.controls['cognome'].setValidators(Validators.required);
      this.formDatiClienteFornitore.controls['luogoNascita'].setValidators(Validators.required);
      this.formDatiClienteFornitore.controls['dataNascita'].setValidators(Validators.required);
      this.formDatiClienteFornitore.controls['codiceFiscale'].setValidators([Validators.required, Validators.minLength(16), Validators.maxLength(17)]);
      this.validationMessages['codiceFiscale'] = {'required':"Questo campo è obbligatorio.", 'minlength':"Il codice fiscale deve avere almeno 16 caratteri.", 'maxlength':"Il codice fiscale non può avere più di 17 caratteri."};
    }
    else if(event.target.value == 'PERSONA_GIURIDICA'){
      this.formDatiClienteFornitore.controls['nome'].clearValidators();
      this.formDatiClienteFornitore.controls['cognome'].clearValidators();
      this.formDatiClienteFornitore.controls['luogoNascita'].clearValidators();
      this.formDatiClienteFornitore.controls['dataNascita'].clearValidators();
      this.formDatiClienteFornitore.controls['denominazione'].clearValidators();

      this.formDatiClienteFornitore.controls['codiceFiscale'].setValidators([Validators.required, Validators.minLength(16), Validators.maxLength(16)]);
      this.validationMessages['codiceFiscale'] = {'required':"Questo campo è obbligatorio.", 'minlength':"Il codice fiscale deve avere 16 caratteri.", 'maxlength':"Il codice fiscale deve avere 16 caratteri."};
      this.formDatiClienteFornitore.controls['partitaIVA'].setValidators(Validators.required);
      this.formDatiClienteFornitore.controls['ragioneSociale'].setValidators(Validators.required);

    }
    else if(event.target.value == 'PUBBLICA_AMMINISTRAZIONE'){
      this.formDatiClienteFornitore.controls['nome'].clearValidators();
      this.formDatiClienteFornitore.controls['cognome'].clearValidators();
      this.formDatiClienteFornitore.controls['luogoNascita'].clearValidators();
      this.formDatiClienteFornitore.controls['dataNascita'].clearValidators();
      this.formDatiClienteFornitore.controls['partitaIVA'].clearValidators();
      this.formDatiClienteFornitore.controls['ragioneSociale'].clearValidators();

      this.formDatiClienteFornitore.controls['codiceFiscale'].setValidators([Validators.required, Validators.minLength(16), Validators.maxLength(16)]);
      this.validationMessages['codiceFiscale'] = {'required':"Questo campo è obbligatorio.", 'minlength':"Il codice fiscale deve avere 16 caratteri.", 'maxlength':"Il codice fiscale deve avere 16 caratteri."};
      this.formDatiClienteFornitore.controls['denominazione'].setValidators(Validators.required);
    }

    this.rigeneraForm();

    if(this.formDatiClienteFornitore.dirty ){

      CommonService.logInfo("EVENT STOPPED!");
      event.preventDefault();

      this._confirmationService.confirm({
        message: 'Stai modificando la forma giuridica, i valori inseriti nella sezione "DATI ANAGRAFICI" verranno persi. Sicuro di voler continuare?',
        accept: () => {
          this.resetDatiAnagrafici();
          this.cliForDTO.tipo = event.target.value;
        },
        reject: () => {
          CommonService.logInfo('REJECTED!!!!');
        }
      });
    }
    else{
      this.cliForDTO.tipo = event.target.value;
    }

  }

  resetDatiAnagrafici(){
    this.formDatiClienteFornitore.controls['nome'].reset();
    this.formDatiClienteFornitore.controls['cognome'].reset();
    this.formDatiClienteFornitore.controls['luogoNascita'].reset();
    this.formDatiClienteFornitore.controls['dataNascita'].reset();
    this.formDatiClienteFornitore.controls['partitaIVA'].reset();
    this.formDatiClienteFornitore.controls['ragioneSociale'].reset();
    this.formDatiClienteFornitore.controls['denominazione'].reset();
    this.formDatiClienteFornitore.controls['codiceFiscale'].reset();
  }

  backToListaClientiFornitori(){
    this._router.navigate(['/home/clientifornitori/lista-clientifornitori']);
  }

  checkFormsValidity() : boolean {

    this.submitted = true;
    CommonService.onValueChanged(null, this.formDatiClienteFornitore, this.formErrors, this.validationMessages, this.submitted);

    CommonService.logInfo("checkFormsValidity -> TIPO CLIFOR: " + this.cliForDTO.tipo);

    let valid:boolean = true;


    if(this.formDatiClienteFornitore.invalid && valid){
      valid = false;
    }

    if(!valid){
      for (const field in this.formErrors) {
        CommonService.logInfo("ERROR FIELD " + field + " : "  + this.formErrors[field]);
      }
    }

    return valid;

  }

  saveConfirm() {

    if(!this.checkFormsValidity()){
      this.displayWarning("Alcuni campi non sono valorizzati correttamente.");
      return;
    }

    this.cliForDTO = this.formDatiClienteFornitore.value;
    this.cliForDTO.dataNascita = DateFormatter.format(new Date(Date.parse(this.cliForDTO.dataNascita)), 'it', 'yyyy-MM-dd');

    CommonService.logInfo("CALL CONFIRM SAVE ClienteFornitore!!! DATI: " + JSON.stringify(this.cliForDTO));
    this._confirmationService.confirm({
      message: 'Sei sicuro di voler procedere con il salvataggio?',
      accept: () => {
        this.salvaClienteFornitore();
      }
    });

  }

  salvaClienteFornitore(){
    if(this.cliForDTO.id > 0){
      this.updateAndCheckClienteFornitore();
    }
    else{
      this.insertClienteFornitore();
    }
  }

  insertClienteFornitore(){
    CommonService.logInfo("_clientiFornitoriService.insertClienteFornitore() START " );
    this._clientiFornitoriService.salvaClienteFornitore(this.cliForDTO).subscribe(
      cliForSaveResponse => this.cliForSaveResponse = cliForSaveResponse,
      error => {
        let msgs: Message[] = CommonService.manageErrors(error, this.formErrors);
        this._commonService.showGrowlMessage(msgs);
        this._commonService.hideBusy();
      },
      () => {
        CommonService.logInfo("_clientiFornitoriService.insertClienteFornitore() - FINISHED! " );
              this._commonService.hideBusy();
              this.backToListaClientiFornitori();
              this.displayInfo("Inserimento effettuatuato con successo.");
      }
    );

  }

  getCodiciIva(){

    let params: URLSearchParams = new URLSearchParams();
    params.set('username',  'USERNAME');

    this._commonService.showBusy();

    this._clientiFornitoriService.getCodiciIva(params).subscribe(
      listaCodiciIVA => this.listaCodiciIVA = listaCodiciIVA,
      error => {
        let msgs: Message[] = CommonService.manageErrors(error, this.formErrors);
        this._commonService.showGrowlMessage(msgs);
        this._commonService.hideBusy();
      },
      () => { CommonService.logInfo("_clientiFornitoriService.getCodiciIva() - FINISHED! " );
        this._commonService.hideBusy();
      }
    );

  }


  cercaInBancaDati(){
    this.displayWarning('Operazione momentaneamente non disponibile');
  }

  cercaInIndicePa(){
    this.displayWarning('Operazione momentaneamente non disponibile');
  }

  getClienteFornitore(id:string){
    this._commonService.showBusy();

    this._clientiFornitoriService.getClienteFornitore(id).subscribe(
      cliForDTO => this.cliForDTO = cliForDTO,
      error => {
        let msgs: Message[] = CommonService.manageErrors(error, this.formErrors);
        this._commonService.showGrowlMessage(msgs);
        this._commonService.hideBusy();
      },
      () => {
        this.cliForDTO.dataNascita = DateFormatter.format(new Date(Date.parse(this.cliForDTO.dataNascita)), 'it', 'dd/MM/yyyy');
        CommonService.logInfo("_clientiFornitoriService.getClienteFornitore() - FINISHED! " );
        this.buildForm();
        this._commonService.hideBusy();
      }
    );
  }


  updateAndCheckClienteFornitore(){
    CommonService.logInfo("_clientiFornitoriService.updateAndCheckClienteFornitore() START " );
    this._clientiFornitoriService.updateAndCheckClienteFornitore(this.cliForDTO).subscribe(
      cliForSaveResponse => this.cliForSaveResponse = cliForSaveResponse,
      error => {
        let msgs: Message[] = CommonService.manageErrors(error, this.formErrors);
        this._commonService.showGrowlMessage(msgs);
        this._commonService.hideBusy();
      },
      () => {
        this._commonService.hideBusy();
        CommonService.logInfo("RESPONSE: " + this.cliForSaveResponse);
        this.backToListaClientiFornitori();
        this.displayInfo("Modifica effettuatuata con successo.");
      }
    );

  }

  eliminaConfirm() {
    CommonService.logInfo("CALL DELETE ClienteFornitore!!!");
    this._confirmationService.confirm({
      message: 'Sei sicuro di voler procedere con la cancellazione?',
      accept: () => {
        this.eliminaClienteFornitore();
      }
    });
  }

  eliminaClienteFornitore(){

    this._clientiFornitoriService.deleteClienteFornitore(String(this.cliForDTO.id)).subscribe(
      cliForSaveResponse => this.cliForSaveResponse = cliForSaveResponse,
      error => {
        let msgs: Message[] = CommonService.manageErrors(error, this.formErrors);
        this._commonService.showGrowlMessage(msgs);
        this._commonService.hideBusy();
      },
      () => { CommonService.logInfo("_clientiFornitoriService.eliminaClienteFornitore() - FINISHED! " );
        this._commonService.hideBusy();
        CommonService.logInfo("RESPONSE: " + this.cliForSaveResponse);
        this.backToListaClientiFornitori();
        this.displayInfo("Cancellazione effettuatuata con successo.");
      }
    );

  }

  changeStatusConfirm() {
    CommonService.logInfo("CALL changeStatus ClienteFornitore!!!");
    this._confirmationService.confirm({
      message: 'Sei sicuro di voler procedere?',
      accept: () => {
        this.changeStatusClienteFornitore();
      }
    });
  }

  changeStatusClienteFornitore(){
    this._clientiFornitoriService.updateStatusClienteFornitore(this.cliForDTO).subscribe(
      cliForSaveResponse => this.cliForSaveResponse = cliForSaveResponse,
      error => {
        let msgs: Message[] = CommonService.manageErrors(error, this.formErrors);
        this._commonService.showGrowlMessage(msgs);
        this._commonService.hideBusy();
      },
      () => { CommonService.logInfo("_clientiFornitoriService.changeStatusClienteFornitore() - FINISHED! " );
        this._commonService.hideBusy();
        CommonService.logInfo("RESPONSE: " + this.cliForSaveResponse);
        this.backToListaClientiFornitori();
        this.displayInfo("Modifica effettuatuata con successo.");
      }
    );
  }


  displayError(error:string){
    let msgs: Message[];
    msgs = [];
    msgs.push({severity:'error', summary:'Si è verificato un Errore !', detail:error});
    this._commonService.showGrowlMessage(msgs);
  }
  displayInfo(mess:string){
    let msgs: Message[];
    msgs = [];
    msgs.push({severity:'info', summary:'Operazione conclusa.', detail:mess});
    this._commonService.showGrowlMessage(msgs);
  }
  displayWarning(mess:string){
    let msgs: Message[];
    msgs = [];
    msgs.push({severity:'warn', summary:'Attenzione.', detail:mess});
    this._commonService.showGrowlMessage(msgs);
  }


  /**
   * Inizializzazione lingua calendar
   */
    // Calendar language
  it: any;
  yearRange:string;

  inizializzaCalendar(){
    this.it = {
      firstDayOfWeek: 0,
      dayNames: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
      dayNamesMin: ["Do","Lu","Ma","Me","Gi","Ve","Sa"],
      monthNames: [ "Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre" ],
      monthNamesShort: [ "Gen", "Feb", "Mar", "Apr", "Mag", "Giu","Lug", "Ago", "Set", "Ott", "Nov", "Dic" ]
    };

    this.yearRange = (new Date().getFullYear() - 100) + ":" + new Date().getFullYear();
  }


}
