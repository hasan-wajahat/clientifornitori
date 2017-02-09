import {Injectable} from "@angular/core";
import {
  Http,
  Response,
  Headers,
  RequestMethod,
  RequestOptions,
  URLSearchParams,
  ResponseContentType
} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Rx";
import {User} from "../model/user/User";
import {LoginResponse} from "../model/user/LoginResponse";
import {CommonService} from "../services/common/common.service";
import {DomSanitizer} from "@angular/platform-browser";
import {environment} from "../../environments/environment";
import {ServicesEndpoint} from "./ServicesEndpoint";

@Injectable()

export class RestCommonUtilsService {
  /**
   * ENDPOINT
   */
    // public baseUrl:string = 'http://localhost:8080';
    //public baseUrl:string = 'http://localhost:10057';
  public baseUrl:string = 'https://192.168.7.98';
  //public baseUrl:string = 'https://84.253.174.50:7443';

  //public baseContext:string = '/fol';
  public baseContext:string = '/FOL';


  constructor(private http: Http, private sanitizer:DomSanitizer) {}


  private response = new LoginResponse();


  // MEMO ------
  // export interface RequestOptionsArgs {
  //   url?: string;
  //   method?: string | RequestMethod;
  //   search?: string | URLSearchParams;
  //   headers?: Headers;
  //   body?: any;
  //   withCredentials?: boolean;
  //   responseType?: ResponseContentType;
  // }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('X-Auth-Token', 'Bearer ' + sessionStorage.getItem('auth_token'));

    console.log('HEADER AUTH TOKEN: ' + 'Bearer ' + sessionStorage.getItem('auth_token'));

    return headers;
  }

  /**
   * Usato solo per sviluppo in modo che calcola in automatico l'url dei service in base al client
   * @returns {any}
   */
  public getBaseUrl():string{

    CommonService.logDebug("LOCAL DEV SERVER: " + environment.localDevServer);
    if(environment.localDevServer != null){
      return environment.localDevServer;
    }


    console.log('HOSTNAME: ' + window.location.hostname);
    var hostname:string = window.location.hostname;
    if(hostname == "localhost" || hostname == "127.0.0.1" || hostname == '192.168.7.141'){
      this.baseContext = '/fol';
      return 'http://localhost:8080';
      //return 'http://192.168.7.98:8080';
    }
    else if(hostname == '192.168.7.98'){
      this.baseContext = '/FOL';
      return 'https://192.168.7.98';
    }
    else if(hostname == '84.253.174.50'){
      this.baseContext = '/FOL';
      return 'https://84.253.174.50:7443';
    }
    else return this.baseUrl;
  }


  /**
   * Call GET
   *
   * @param url - URL service
   * @param params - parametri (request/query)
   * @param pathVariableMap - parametri passati nel PATH (es. /api/v1/cliFor/{id})
   * @returns {Observable<R>}
   */
  getBinaryDataObjectURL(url:string, params?:URLSearchParams, pathVariableMap?:any) {

    if(pathVariableMap != null){
      url = this.retrieveUrlWithPathVariables(pathVariableMap, url);
    }

    let headers = new Headers();
    headers.append('Content-Type', 'image/jpeg');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('X-Auth-Token', 'Bearer ' + sessionStorage.getItem('auth_token'));

    console.log('HEADER AUTH TOKEN: ' + 'Bearer ' + sessionStorage.getItem('auth_token'));

    let requestOptionsArgs = {search:params, method: RequestMethod.Get, headers: headers, body:'', responseType: ResponseContentType.ArrayBuffer };

    return this.http.get(this.getBaseUrl() + this.baseContext + url ,requestOptionsArgs)
      .map(res => {
        console.log("RES: " + res);
        console.log("RES BODY SIZE: " + res.arrayBuffer().byteLength);
        console.log("content lenght: " + res.headers);

        //FileSaver.saveAs(blob, "nome.jpg");

        return res.arrayBuffer();
      })
      .map(buff => {
        console.log('BUFF: ' + buff);

        //FileSaver.saveAs(blob, "nome.jpg");

        return new Blob([buff], {
          type: 'image/jpeg'
        });

      })
      .map(blob => {
        return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
      })
      .catch(this.handleError);
  }

  /**
   * Call GET
   *
   * @param url - URL service
   * @param params - parametri (request/query)
   * @param pathVariableMap - parametri passati nel PATH (es. /api/v1/cliFor/{id})
   * @returns {Observable<R>}
   */
  jsonGet(url:string, params?:URLSearchParams, pathVariableMap?:any) {

    if(pathVariableMap != null){
      url = this.retrieveUrlWithPathVariables(pathVariableMap, url);
    }

    let headers = this.getHeaders();

    let requestOptionsArgs = {search:params, validateUsr: "false",method: RequestMethod.Get, headers: headers, body:''};

    return this.http.get(this.getBaseUrl() + this.baseContext + url ,requestOptionsArgs)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /**
   * Call POST
   *
   * @param url - URL service
   * @param inputDTO - oggetto che verrà passato nel body della chiamata
   * @param pathVariableMap - parametri passati nel PATH (es. /api/v1/cliFor/{id})
   * @returns {Observable<R>}
   */
  postJson(url:string, inputDTO:any, pathVariableMap?:any){

    if(pathVariableMap != null){
      url = this.retrieveUrlWithPathVariables(pathVariableMap, url);
    }

    var body = JSON.stringify(inputDTO);

    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.getBaseUrl() + this.baseContext + url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  };

  /**
   * POST usato dalla login
   * @param url
   * @param inputDTO
   * @returns {Observable<R>}
   */
  postLoginJson(url:string, inputDTO:any){

    let params = JSON.stringify(inputDTO);

    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.getBaseUrl() + this.baseContext + url, params, options)
      .map(this.extractLoginData)
      .catch(this.handleLoginError);
  };

  /**
   * Chiama una POST passando un multipart/form-data
   * @param url
   * @param formData
   * @returns {Observable<R>}
   */
  postFormData(url:string, formData:FormData){

    let headers = this.getHeaders();
    headers.delete('Content-Type');
    //headers.append('Content-Type', 'multipart/form-data');  non serve lo fa in auto

    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.getBaseUrl() + this.baseContext + url, formData, options)
      .map(this.extractData)
      .catch(this.handleError);

  };

  /**
   *
   * @param url
   * @param inputDTO - oggeto che verrà passato come json nel body
   * @param urlSearchParams - parametri (request/query)
   * @param pathVariableMap - parametri passati nel PATH (es. /api/v1/cliFor/{id})
   * @returns {Observable<R>}
   */
  putJson(url:string, inputDTO:any, urlSearchParams:URLSearchParams, pathVariableMap?:any){

    if(pathVariableMap != null){
      url = this.retrieveUrlWithPathVariables(pathVariableMap, url);
    }

    var params = JSON.stringify(inputDTO);

    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers, search: urlSearchParams });

    return this.http.put(this.getBaseUrl() + this.baseContext + url, params, options)
      .map(res => res);
  };

  /**
   *
   * @param url
   * @param urlSearchParams - parametri (request/query)
   * @param pathVariableMap - parametri passati nel PATH (es. /api/v1/cliFor/{id})
   * @returns {Observable<R>}
   */
  deleteJson(url:string, urlSearchParams:URLSearchParams, pathVariableMap?:any){

    if(pathVariableMap != null){
      url = this.retrieveUrlWithPathVariables(pathVariableMap, url);
    }

    let headers = this.getHeaders();

    let options = new RequestOptions({ headers: headers, search: urlSearchParams });

    return this.http.delete(this.getBaseUrl() + this.baseContext + url, options)
      .map(res => res);
  };

  private extractData(res: Response) {
    let body = res.json();
    //return body.data || { };
    console.log("[SERVICE RESPONSE DATA]: " + res.text());
    return body || { };
  }

  private extractBinaryData(res: Response) {

    let blob:Blob = new Blob([res.arrayBuffer()], {
      type: res.headers.get("Content-Type")
    });

    console.log("extractBinaryData - BLOB: " + blob.size);
    console.log('WIN: ' + window.URL);
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
  }

  private handleError (error: any) {

    console.log("ERROR BEFORE THROW: "  + JSON.stringify(error));

    return Observable.throw(error);
  }

  private extractLoginData(res: Response) {
    var user:User = res.json();
    var headers = res.headers;
    console.log('postLoginJson - USER: ' + JSON.stringify(user));
    console.log('postLoginJson - HEADERS: ' + JSON.stringify(headers));
    this.response = new LoginResponse();
    this.response.user = user;
    this.response.token = headers.get('X-AUTH-TOKEN');
    console.log('postLoginJson - X-AUTH-TOKEN : ' + this.response.token);

    return this.response || { };
  }

  private handleLoginError (error: any) {
    return Observable.throw(error);
  }

  public retrieveUrlWithPathVariables(pathVariableMap:any, url:string) : string {
    Object.keys(pathVariableMap).forEach(key => {
      let value = pathVariableMap[key];
      CommonService.logDebug("KEY: " + key + " VALUE: " + value);
      url = url.replace('{' + key + '}', value);
    });

    CommonService.logDebug("URL: " + url);

    return url;
  }

  public retriveResourcePath(resourceId){
    let basePath = this.getBaseUrl() + this.baseContext;
    let urlDownloadFile = this.retrieveUrlWithPathVariables({'docId':resourceId}, ServicesEndpoint.operationDownloadFile);
    return basePath + urlDownloadFile + "?X-AUTH-TOKEN=" + sessionStorage.getItem('auth_token') + "&contentDisposition=INLINE";
  }


}
