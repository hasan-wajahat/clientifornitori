import {Injectable} from "@angular/core";
import {RestCommonUtilsService} from "../../utils/rest-common-utils.service";
import {URLSearchParams} from "@angular/http";
import {Movimento} from "../../model/movimenti/movimento";
import {ServicesEndpoint} from "../../utils/ServicesEndpoint";

@Injectable()
export class MovimentiService {

  constructor(private restCommonUtil:RestCommonUtilsService) {

  }

  getListaMovimenti( params: URLSearchParams ) {
    let operationPath = ServicesEndpoint.operationMovimentiList;
    return this.restCommonUtil.jsonGet(operationPath, params);
  }

  salvaMovimento(movimento:Movimento) {
    let operationPath = ServicesEndpoint.operationMovimentoInsert;
    return this.restCommonUtil.postJson(operationPath, movimento);
  }

  getMovimento(id:string){
    let params: URLSearchParams = new URLSearchParams();
    let operationPath = ServicesEndpoint.operationGetMovimento;
    return this.restCommonUtil.jsonGet(operationPath, params, {'id':id});
  }

  updateAndCheckMovimento(movimento:Movimento) {
    let operationPath = ServicesEndpoint.operationUpdateAndCheckMovimento;
    return this.restCommonUtil.putJson(operationPath, movimento, new URLSearchParams());
  }

  deleteMovimento(id:string) {
    let urlParams:URLSearchParams = new URLSearchParams();
    let operationPath = ServicesEndpoint.operationDeleteMovimento;
    return this.restCommonUtil.deleteJson(operationPath, urlParams, {'id':id});
  }

}
