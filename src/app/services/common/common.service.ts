import {Injectable, ElementRef} from "@angular/core";
import {Message} from "primeng/primeng";
import {FormGroup} from "@angular/forms";
import {ErrorDetail} from "../../model/commons/ErrorDetail";
import {ValidationError} from "../../model/commons/ValidationError";
import {NumberFormatter, NumberFormatStyle} from "@angular/common/src/pipes/intl";

@Injectable()
export class CommonService {

  constructor(private el: ElementRef) {}

  showBusyEvent = new CustomEvent('showBusyEvent', { bubbles: true, detail:true });
  hideBusyEvent = new CustomEvent('hideBusyEvent', { bubbles: true });

  private static logDebugEnabled:boolean = true;
  private static logInfoEnabled:boolean = true;
  private static logErrorEnabled:boolean = true;

  showBusy() {
    try {
      this.el.nativeElement.dispatchEvent(this.showBusyEvent);
    }catch (e){
      CommonService.logError("showBusyEvent dispatchEvent ERROR!");
    }
  }

  hideBusy() {
    try {
      this.el.nativeElement.dispatchEvent(this.hideBusyEvent);
    }catch (e){
      CommonService.logError("hideBusyEvent dispatchEvent ERROR!");
    }
  }


  public showGrowlMessage( msgs: Message[] ){
    let showGrowlMessageEvent = new CustomEvent('showGrowlMessageEvent', { bubbles: true, detail:msgs });
    this.el.nativeElement.dispatchEvent(showGrowlMessageEvent);
  }

  public static getValidationErrors(errorDetail:ErrorDetail, formErrors:any){
    for (let prop in errorDetail.validationErrors){
      formErrors[prop] += this.getFieldValidationMessages(errorDetail, prop);
    }
  }

  public static getFieldValidationMessages(errorDetail:ErrorDetail, prop:string):string {
    let validationMessage:string = '';
    let listValidationErrors:ValidationError[] = errorDetail.validationErrors[prop];
    for (let i = 0; i < listValidationErrors.length; i++) {
      let validationError:ValidationError = listValidationErrors[i];
      validationMessage += validationError.message + ' ';
    }

    return validationMessage;
  }

  public static cleanFormErrors(formErrors:any){
    for (const field in formErrors) {
      // clear previous error message (if any)
      formErrors[field] = '';
    }
  }

  public static manageErrors(error:any, formErrors:any):Message[]{
    let globalMessage:string = '';

    let errorDetail:ErrorDetail;

    try{
      errorDetail = error.json();
    }
    catch (e){
      return CommonService.generateErrorMessage(e.toString());
    }


    console.log("ERROR: " + JSON.stringify(errorDetail));
    if(errorDetail.hasOwnProperty('detail')){
      if(formErrors != null){
        CommonService.cleanFormErrors(formErrors);
      }

      if(errorDetail.type == 'VALIDATION'){
        if(formErrors != null) {
          CommonService.getValidationErrors(errorDetail, formErrors);
        }
        if(errorDetail.validationErrors.hasOwnProperty('_global_')){
          globalMessage = CommonService.getFieldValidationMessages(errorDetail, '_global_');
        }
        else{
          globalMessage = "Alcuni campi non sono valorizzati correttamente.";
        }
      }
      else {
        return CommonService.generateErrorMessage(errorDetail.detail);
      }

      return CommonService.generateWarningMessage(globalMessage);
    }
    else{
      if(error && error.status == 0){
        return CommonService.generateErrorMessage("Il server non risponde!");
      }
      else {
        return CommonService.generateErrorMessage(error);
      }
    }
  }

  public static generateErrorMessage(error:string):Message[]{
    let msgs: Message[];
    msgs = [];
    msgs.push({severity:'error', summary:'Si è verificato un Errore !', detail:error});
    return msgs;
  }
  public static generateWarningMessage(mess:string):Message[]{
    let msgs: Message[];
    msgs = [];
    msgs.push({severity:'warn', summary:'Attenzione.', detail:mess});
    return msgs;
  }
  public static generateInfoMessage(mess:string):Message[]{
    let msgs: Message[];
    msgs = [];
    msgs.push({severity:'info', summary:'Operazione conclusa.', detail:mess});
    return msgs;
  }

  /**
   * Questa Function va legata alla onValueChanged della form
   *
   * @param data
   * @param formDati
   * @param formErrors
   * @param validationMessages
   * @param submitted
   */
  public static onValueChanged(data: any, formDati:FormGroup, formErrors:any, validationMessages:any, submitted:boolean) {

    // console.log("FORM " + formDati.toString() + " CONTROLS: ");
    // for (let control in formDati.controls){
    //   var c:any = control;
    //   console.log(" - " + c);
    // }

    if (!formDati) { return; }
    const form = formDati;

    // Presuppone che le chiavi dell'array formErrors siano uguali a quelle dei controls
    for (const field in formDati.controls) {
      // clear previous error message (if any)
      formErrors[field] = '';
      const control = form.get(field);
      //console.log('CONTROL ' + field + ' : ' + control);

      if(control != null) {
        if (control && control.dirty && !control.valid || submitted) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            formErrors[field] += messages[key] + ' ';
          }
        }
      }

    }
  }

  public static logDebug(text:string){
    if(this.logDebugEnabled){
      console.log("[DEBUG] : " + text);
    }
  }

  public static logInfo(text:string){
    if(this.logInfoEnabled){
      console.log("[INFO] : " + text);
    }
  }

  public static logError(text:string){
    if(this.logErrorEnabled){
      console.log("[ERROR] : " + text);
    }
  }

  public static currencyFormat(value:number, currency:string) : string{
    return NumberFormatter.format(value, 'it', NumberFormatStyle.Currency, {currency:currency, currencyAsSymbol:true});
  }

  public displayError(error:string){
    // let msgs: Message[];
    // msgs = [];
    // msgs.push({severity:'info', summary:'Attenzione.', detail:'Funzione di inserimento non ancora disponibile!'});
    // msgs.push({severity:'warn', summary:'Attenzione.', detail:'Funzione di inserimento non ancora disponibile!'});
    // msgs.push({severity:'error', summary:'Attenzione.', detail:'Funzione di inserimento non ancora disponibile!'});
    // this._commonService.showGrowlMessage(msgs);

    let msgs: Message[];
    msgs = [];
    msgs.push({severity:'error', summary:'Si è verificato un Errore !', detail:error});
    this.showGrowlMessage(msgs);
  }

  public displayWarning(error:string, summary:string){
    let msgs: Message[];
    msgs = [];
    msgs.push({severity:'warn', summary:summary , detail:error});
    this.showGrowlMessage(msgs);
  }

  public displayInfo(error:string, summary:string){
    let msgs: Message[];
    msgs = [];
    msgs.push({severity:'info', summary:summary, detail:error});
    this.showGrowlMessage(msgs);
  }

}
