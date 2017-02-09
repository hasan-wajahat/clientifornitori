// user.service.ts
import {Injectable} from "@angular/core";
import {RestCommonUtilsService} from "../../utils/rest-common-utils.service";
import {UserCredential} from "../../model/user/UserCredential";
import {User} from "../../model/user/User";
import {ContentDisposition} from "../../model/user/EnumContentDisposition";
import {URLSearchParams} from "@angular/http";
import {stringify} from "@angular/platform-browser/src/facade/lang";
import {CommonService} from "../common/common.service";
import {ServicesEndpoint} from "../../utils/ServicesEndpoint";


@Injectable()
export class UserService {

  public user:User;
  public loggedIn = false;

  constructor(private restCommonUtil:RestCommonUtilsService) {
    console.log("Initialize UserService ...");
    this.loggedIn = !!sessionStorage.getItem('auth_token');
    console.log('auth_token: ' + this.loggedIn)
  }

  login(email, password) {

    let credential:UserCredential = new UserCredential();
    credential.username = email;
    credential.password = password;

    return this.performLogin(credential);

  }

  performLogin( credential: UserCredential ) {
    let operationPath = ServicesEndpoint.operationLogin;
    return this.restCommonUtil.postLoginJson(operationPath, credential);
  }

  logout() {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('UserData');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  registrazioneUtente(user:User, fileLogo:File, fileVisuraCamerale:File, fileCartaIdentita:File){
    let operationPath = ServicesEndpoint.operationRegistrazioneUtente;
    let userData = JSON.stringify(user);

    let formData = new FormData();
    formData.append("user", userData);
    formData.append("logo", fileLogo);
    formData.append("cartaIdentita", fileVisuraCamerale);
    formData.append("visuraCamerale", fileCartaIdentita);

    return this.restCommonUtil.postFormData(operationPath, formData);
  }

  modificaUtente(user:User, fileLogo:File, fileVisuraCamerale:File, fileCartaIdentita:File){
    let operationPath = ServicesEndpoint.operationUpdateUser;
    let userData = JSON.stringify(user);

    let formData = new FormData();
    formData.append("user", userData);
    formData.append("logo", fileLogo);
    formData.append("cartaIdentita", fileVisuraCamerale);
    formData.append("visuraCamerale", fileCartaIdentita);

    return this.restCommonUtil.postFormData(operationPath, formData);
  }

  getCodiciIva(){
    let operationPath = ServicesEndpoint.operationListaCodiciVAT;
    return this.restCommonUtil.jsonGet(operationPath);
  }

  downloadFile(docId:number, contentDisposition:ContentDisposition){
    let operationPath = ServicesEndpoint.operationDownloadFile;
    let params:URLSearchParams = new URLSearchParams();
    let contentDisp:string = stringify(contentDisposition);
    CommonService.logDebug("contentDisposition:" + contentDisp);
    params.append('contentDisposition', contentDisp);

    return this.restCommonUtil.getBinaryDataObjectURL(operationPath, params, {'docId':docId});
  }

}
