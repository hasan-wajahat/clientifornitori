import {Injectable} from "@angular/core";
import {RestCommonUtilsService} from "../../utils/rest-common-utils.service";
import {URLSearchParams} from "@angular/http";
import {CliFor} from "../../model/clientifornitori/CliFor";
import {ServicesEndpoint} from "../../utils/ServicesEndpoint";

@Injectable()
export class ClientiFornitoriService {

  constructor(private restCommonUtil:RestCommonUtilsService) {

  }

  getListaClientiFornitori( params: URLSearchParams ) {
    let operationPath = ServicesEndpoint.operationCliForList;
    return this.restCommonUtil.jsonGet(operationPath, params);
  }

  salvaClienteFornitore(cliFor:CliFor) {
    let operationPath = ServicesEndpoint.operationCliForInsert;
    return this.restCommonUtil.postJson(operationPath, cliFor);
  }

  getCodiciIva(params: URLSearchParams){
    let operationPath = ServicesEndpoint.operationListaCodiciVAT;
    return this.restCommonUtil.jsonGet(operationPath, params);
  }

  getClienteFornitore(id:string){
    let params: URLSearchParams = new URLSearchParams();
    let operationPath = ServicesEndpoint.operationGetClienteFornitore;
    return this.restCommonUtil.jsonGet(operationPath, params, {'id':id});
  }

  updateAndCheckClienteFornitore(cliFor:CliFor) {
    let operationPath = ServicesEndpoint.operationUpdateAndCheckClienteFornitore;
    return this.restCommonUtil.putJson(operationPath, cliFor, new URLSearchParams());
  }

  deleteClienteFornitore(id:string) {
    let urlParams:URLSearchParams = new URLSearchParams();
    let operationPath = ServicesEndpoint.operationDeleteClienteFornitore;
    return this.restCommonUtil.deleteJson(operationPath, urlParams, {'id':id});
  }

  updateStatusClienteFornitore(cliFor:CliFor) {
    let operationPath = ServicesEndpoint.operationUpdateStatusClienteFornitore;
    console.log("updateStatusClienteFornitore: CliFor  -> " + JSON.stringify(cliFor));
    let queryString:URLSearchParams = new URLSearchParams();
    queryString.append('cliForId', String(cliFor.id));
    queryString.append('status', String(cliFor.stato));

    return this.restCommonUtil.putJson(operationPath, {'cliForId':cliFor.id,'status':cliFor.stato}, queryString);
  }

}
