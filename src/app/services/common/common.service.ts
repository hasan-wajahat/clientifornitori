import {Injectable, ElementRef} from "@angular/core";
import {Message} from "primeng/primeng";
import {FormGroup, FormArray} from "@angular/forms";
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

  public static getValidationErrors(errorDetail:ErrorDetail, formErrors:any) : any{
    for (let prop in errorDetail.validationErrors){
      let errMsg = this.getFieldValidationMessages(errorDetail, prop);
      if(errMsg != null && errMsg != '' && !formErrors.hasOwnProperty(prop)){
        return errMsg;
      }
      formErrors[prop] += errMsg;
      return null;
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
          let checkFieldErrorNotExist = CommonService.getValidationErrors(errorDetail, formErrors);
          if(checkFieldErrorNotExist != null){
            return CommonService.generateWarningMessage(checkFieldErrorNotExist);
          }
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
   * Genera dinamicamente gli oggetti che serviranno come segnaposto per gli errori generati nella form
   * Questa verrà chiamata prima di una validazione su un FormArray (lista dinamica di FormGroup)
   * @param formArray
   * @returns {Array}
   */
  public static buildFormArrayErrors(formArray:FormArray):any[]{
    let errors = [];

    formArray.controls.forEach(item => {
      let curFormGroup:FormGroup = <FormGroup> item;
      let errorObj:any = new Object();
      let arrayOfKeys = Object.keys(curFormGroup.controls);
      arrayOfKeys.forEach(key => {errorObj[key] = ''});
      errors.push(errorObj);
    });

    return errors;
  }

  public static buildFormGroupErrors(formGroup:FormGroup):any{

    let errorObj:any = new Object();
    let arrayOfKeys = Object.keys(formGroup.controls);
    arrayOfKeys.forEach(key => {errorObj[key] = ''});

    return errorObj;
  }

  public static onValueChangedFormArray(data: any, formArray:FormArray, formErrorsArray:any[], validationMessages:any, submitted:boolean) {

    for(let i=0;i<formArray.length;i++){

      let formDati:FormGroup = <FormGroup>formArray.at(i);

      if (!formDati) { return; }
      const form = formDati;
      let formErrors:any = formErrorsArray[i];

      // Presuppone che le chiavi dell'array formErrors siano uguali a quelle dei controls
      for (const field in formDati.controls) {
        // clear previous error message (if any)
        formErrors[field] = '';
        const control = form.get(field);
        if(control != null) {
          if (control && control.dirty && control.invalid) {

            if(!validationMessages.hasOwnProperty(field)){
              console.log("VALIDATION MESSAGE NOT CONTAIN PROPERTY: '" + field + "'");
            }
            const messages = validationMessages[field];

            for (const key in control.errors) {
              formErrors[field] += messages[key] + ' ';
              console.log('ERROR IN FIELD ' + field + ' - MSG KEY: ' + key + " - " + formErrors[field]);
            }
          }
        }

      }

    }


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
        if (control && control.dirty && control.invalid) {
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

  public static getCalendarLanguage():any{

     let it:any = {
        firstDayOfWeek: 0,
        dayNames: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
        dayNamesMin: ["Do","Lu","Ma","Me","Gi","Ve","Sa"],
        monthNames: [ "Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre" ],
        monthNamesShort: [ "Gen", "Feb", "Mar", "Apr", "Mag", "Giu","Lug", "Ago", "Set", "Ott", "Nov", "Dic" ]
      };

      return it;
  }

}
