/**
 * Created by Rocco on 26/01/2017.
 */

export class ServicesEndpoint {

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
   * path servizi rest Corrispettivi
   */
  public static operationCorrispettiviList = '/api/v1/corrispettivo/';
  public static operationCorrispettiviInsert = '/api/v1/corrispettivo/';
  public static operationGetCorrispettivi = '/api/v1/corrispettivo/{id}';
  public static operationCountCorrispettivi = '/api/v1/corrispettivo/countCorrispettiviPerMese/';
  public static operationUpdateAndCheckCorrispettivi = '/api/v1/corrispettivo/';
  public static operationDeleteCorrispettivi = '/api/v1/corrispettivo/{id}';
  public static operationUpdateStatusCorrispettivi = '/api/v1/corrispettivo/status';
  public static operationGetBills = '/api/v1/bills/listOfValues/';

  /**
   * path servizi login/gestione utente
   */
  public static operationLogin:string = '/api/login';
  public static operationRegistrazioneUtente:string = '/api/public/v1/users/registration';
  public static operationListaCodiciVAT:string = '/api/public/v1/codesVAT';
  public static operationUpdateUser:string = '/api/v1/users';
  public static operationDownloadFile:string = '/api/v1/download/{docId}';

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



}
