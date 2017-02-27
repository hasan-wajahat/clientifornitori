import {Component, OnInit} from "@angular/core";
import {Router, Params, ActivatedRoute} from "@angular/router";
import {CommonService} from "../../../services/common/common.service";
import {Message, ConfirmationService} from "primeng/primeng";
import {URLSearchParams} from "@angular/http";
import {User} from "../../../model/user/User";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Movimento} from "../../../model/movimenti/movimento";
import {ModificaMovimentoForms} from "./modifica-movimento.forms";
import {MovimentiService} from "../../../services/movimenti/movimenti.service";

@Component({
  selector: 'app-modifica-movimento',
  templateUrl: './modifica-movimento.component.html',
  styleUrls: ['./modifica-movimento.component.css'],
  providers: [MovimentiService, CommonService]
})
export class ModificaMovimentoComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private movimentiService: MovimentiService,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder) { }

  movimentoDTO: Movimento;
  movimentoSaveResponse: any;
  userData: User;
  today: Date;
  formDatiMovimento: FormGroup;
  contoId:string;
  yearRange: string = (new Date().getFullYear() - 30) + ':' + (new Date().getFullYear());

  formErrors = ModificaMovimentoForms.formErrors;
  validationMessages = ModificaMovimentoForms.validationMessages;

  submitted: boolean = false;

  ngOnInit() {
    this.today = new Date();
    this.inizializzaCalendar();

    CommonService.logDebug("Inizializzo con dati default!");
    this.userData = <User>JSON.parse(sessionStorage.getItem("UserData"));

    // TODO: Per tutte le costanti creare ed usare ENUMERATO come da BACK-END
    this.movimentoDTO = new Movimento();

    this.route.params.subscribe(params => {
      CommonService.logDebug("PARAMS: " + JSON.stringify(params));
      if (params['contoId'] != null) {
        this.contoId = params['contoId'];
        CommonService.logDebug("CONTOID: " + params['contoId']);

        let id = +params['id']; // (+) converts string 'id' to a number
        if (!isNaN(id)) {
          this.getMovimento(String(id));
        }
      }
    });

    CommonService.logDebug("BUILD FORM!!!");
    this.buildForm();
  }

  buildForm(): void {

    this.formDatiMovimento = ModificaMovimentoForms.buildFormDatiMovimento(this.movimentoDTO, this.fb);

    this.formDatiMovimento.valueChanges
      .subscribe(data => CommonService.onValueChanged(data, this.formDatiMovimento, this.formErrors, this.validationMessages, this.submitted));

  }

  backToListaMovimenti() {
    this.router.navigate([`/home/movimenti/lista-movimenti/${this.contoId}`]);
  }

  checkFormsValidity(): boolean {

    this.submitted = true;
    CommonService.onValueChanged(null, this.formDatiMovimento, this.formErrors, this.validationMessages, this.submitted);


    let valid: boolean = true;


    if (this.formDatiMovimento.invalid && valid) {
      valid = false;
    }

    if (!valid) {
      for (const field in this.formErrors) {
        CommonService.logInfo("ERROR FIELD " + field + " : " + this.formErrors[field]);
      }
    }

    return valid;

  }

  saveConfirm() {

    if (!this.checkFormsValidity()) {
      this.displayWarning("Alcuni campi non sono valorizzati correttamente.");
      return;
    }

    this.movimentoDTO = Object.assign(new Movimento(), this.formDatiMovimento.value);
    this.movimentoDTO.contoId = +this.contoId;

    CommonService.logInfo("CALL CONFIRM SAVE Movimento!!! DATI: " + JSON.stringify(this.movimentoDTO));
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler procedere con il salvataggio?',
      accept: () => {
        this.salvaMovimento();
      }
    });

  }

  getMovimento(id: string) {
    this.commonService.showBusy();

    this.movimentiService.getMovimento(id).subscribe(
      movimentoDTO => this.movimentoDTO = Object.assign(new Movimento(), movimentoDTO),
      error => {
        let msgs: Message[] = CommonService.manageErrors(error, this.formErrors);
        this.commonService.showGrowlMessage(msgs);
        this.commonService.hideBusy();
      },
      () => {
        CommonService.logInfo("movimentiService.getMovimento() - FINISHED! ");
        CommonService.logInfo(this.movimentoDTO.corrispettivo.tipoDocumento)
        CommonService.logInfo(JSON.stringify(this.movimentoDTO));
        this.buildForm();
        this.commonService.hideBusy();
      }
    );
  }

  salvaMovimento() {
    if (this.movimentoDTO.id > 0) {
      this.updateAndCheckMovimento();
    }
    else {
      this.insertMovimento();
    }
  }

  updateAndCheckMovimento() {
    CommonService.logInfo("movimentiService.updateAndCheckMovimento() START ");
    this.movimentiService.updateAndCheckMovimento(this.movimentoDTO).subscribe(
      movimentoSaveResponse => this.movimentoSaveResponse = movimentoSaveResponse,
      error => {
        let msgs: Message[] = CommonService.manageErrors(error, this.formErrors);
        this.commonService.showGrowlMessage(msgs);
        this.commonService.hideBusy();
      },
      () => {
        this.commonService.hideBusy();
        CommonService.logInfo("RESPONSE: " + this.movimentoSaveResponse);
        this.backToListaMovimenti();
        this.displayInfo("Modifica effettuatuata con successo.");
      }
    );

  }

  insertMovimento() {
    CommonService.logInfo("movimentiService.insertMovimento() START ");
    this.movimentiService.salvaMovimento(this.movimentoDTO).subscribe(
      movimentoSaveResponse => this.movimentoSaveResponse = movimentoSaveResponse,
      error => {
        let msgs: Message[] = CommonService.manageErrors(error, this.formErrors);
        this.commonService.showGrowlMessage(msgs);
        this.commonService.hideBusy();
      },
      () => {
        CommonService.logInfo("movimentiService.insertMovimento() - FINISHED! ");
        this.commonService.hideBusy();
        this.backToListaMovimenti();
        this.displayInfo("Inserimento effettuatuato con successo.");
      }
    );

  }

  eliminaConfirm() {
    CommonService.logInfo("CALL DELETE Movimento!!!");
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler procedere con la cancellazione?',
      accept: () => {
        this.eliminaMovimento();
      }
    });
  }

  eliminaMovimento() {
    this.movimentiService.deleteMovimento(String(this.movimentoDTO.id)).subscribe(
      movimentoSaveResponse => this.movimentoSaveResponse = movimentoSaveResponse,
      error => {
        let msgs: Message[] = CommonService.manageErrors(error, this.formErrors);
        this.commonService.showGrowlMessage(msgs);
        this.commonService.hideBusy();
      },
      () => {
        CommonService.logInfo("movimentiService.eliminaMovimento() - FINISHED! ");
        this.commonService.hideBusy();
        CommonService.logInfo("RESPONSE: " + this.movimentoSaveResponse);
        this.backToListaMovimenti();
        this.displayInfo("Cancellazione effettuatuata con successo.");
      }
    );
  }

  rigeneraForm(){
    // Bug Angular 2  - Serve solo per far reinizializzare i controls
    //this.formDatiMovimento.setMovimentrol('numeroCarta',this.formDatiMovimento.controls['numeroCarta']);
  }

  displayError(error: string) {
    let msgs: Message[];
    msgs = [];
    msgs.push({ severity: 'error', summary: 'Si è verificato un Errore !', detail: error });
    this.commonService.showGrowlMessage(msgs);
  }

  displayInfo(mess: string) {
    let msgs: Message[];
    msgs = [];
    msgs.push({ severity: 'info', summary: 'Operazione conclusa.', detail: mess });
    this.commonService.showGrowlMessage(msgs);
  }

  displayWarning(mess: string) {
    let msgs: Message[];
    msgs = [];
    msgs.push({ severity: 'warn', summary: 'Attenzione.', detail: mess });
    this.commonService.showGrowlMessage(msgs);
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
