/**
 * Created by Rocco on 26/01/2017.
 */

export class ServicesEndpoint {
  /**
   * path servici COMMON Corrispettivi - Acquisti
   */
  public static operationListaCodiciVAT:string = '/api/public/v1/codesVAT';
  public static operationGetBills = '/api/v1/bills/listOfValues/';
  public static operationGetBillsCli = '/api/v1/bills/listOfValues/';
  public static operationGetVociAcquisto = '/api/v1/purchaseItems/';

  /**
   * path servizi rest Clienti/Fornitori
   */
  public static operationCliForList = '/api/v1/cliFor/';
  public static operationCliForInsert = '/api/v1/cliFor/';
  public static operationGetClienteFornitore = '/api/v1/cliFor/{id}';
  public static operationUpdateAndCheckClienteFornitore = '/api/v1/cliFor/';
  public static operationDeleteClienteFornitore = '/api/v1/cliFor/{id}';
  public static operationUpdateStatusClienteFornitore = '/api/v1/cliFor/status';

  /**
   * path servizi rest Acquisti
   */

  public static operationAcquistiList = '/api/v1/purchases/';
  public static operationGetAcquisti = '/api/v1/purchases/{id}';
  public static operationGetFornitore = '/api/v1/purchases/cliFor/find';

  /**
   * path servizi rest Corrispettivi
   */
  public static operationCorrispettiviList = '/api/v1/corrispettivo/';
  public static operationCorrispettiviInsert = '/api/v1/corrispettivo/';
  public static operationGetCorrispettivi = '/api/v1/corrispettivo/{id}';
  public static operationCountCorrispettivi = '/api/v1/corrispettivo/countCorrispettiviPerMese/';
  public static operationUpdateAndCheckCorrispettivi = '/api/v1/corrispettivo/';
  public static operationDeleteCorrispettivi = '/api/v1/corrispettivo/{id}';
  public static operationCorrispettiviConfirm = '/api/v1/corrispettivo/confirmFullMonth';
  public static operationGetUltimoConfermato = '/api/v1/corrispettivo/lastConfirmed';

  /**
   * path servizi login/gestione utente
   */
  public static operationLogin:string = '/api/login';
  public static operationRegistrazioneUtente:string = '/api/public/v1/users/registration';
  public static operationUpdateUser:string = '/api/v1/users';
  public static operationDownloadFile:string = '/api/v1/download/{docId}';
  public static operationListaCassePrevidenza:string = '/api/public/v1/FE/tipoCassa';
  public static operationListaRegimiFiscali:string = '/api/public/v1/FE/regimeFiscale';

  /**
   * Scadenziario
   */
  public static operationListaScadenze = '/api/v1/scadenze/scadenziario';
  public static operationListaScadenzeGiorno = '/api/v1/scadenze/';


  /**
   * Dashboard
   */
  public static operationTotaliUtenteAnno = '/api/v1/dashboard/totalUserYear';
  public static operationTotaliUtenteMese = '/api/v1/dashboard/totalUserYearMonth';
  public static operationTotaliClienteFornitoreMensi = '/api/v1/dashboard/totalCliForYearMonth';
  public static operationTotaliClienteFornitoreAnno = '/api/v1/dashboard/totalCliForYear';


  /**
   * path servizi rest Conti
   */
  public static operationContiList = '/api/v1/bills/';
  public static operationContoInsert = '/api/v1/bills/';
  public static operationGetConto = '/api/v1/bills/{id}';
  public static operationUpdateAndCheckConto = '/api/v1/bills/';
  public static operationDeleteConto = '/api/v1/bills/{id}';
  /**static
   * path servizi rest Movimenti
   */
  public static operationMovimentiList = '/api/v1/movements/';
  public static operationMovimentoInsert = '/api/v1/movements/';
  public static operationGetMovimento = '/api/v1/movements/{id}';
  public static operationUpdateAndCheckMovimento = '/api/v1/movements/';
  public static operationDeleteMovimento = '/api/v1/movements/{id}';

}
