import {Injectable} from '@angular/core';
import {RestCommonUtilsService} from "../../utils/rest-common-utils.service";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class VenditeService {

  constructor(private restCommonUtil:RestCommonUtilsService) {}

  getFattureVendite() {
    //return this.restCommonUtil.jsonGet('app/resources/data/fatture-vendite.json');
  }

  getAllSales(params: URLSearchParams){
    return this.restCommonUtil.jsonGet('/api/v1/sales/',params)
  }

  getSale(id: string){
    return this.restCommonUtil.jsonGet(`/api/v1/sales/${id}`)
  }

  getcodesVAT(){
    return this.restCommonUtil.jsonGet(`/api/public/v1/codesVAT`)
  }

  putSale(id: string, sales:any){
     return this.restCommonUtil.putJson(`/api/v1/sales/`, sales, new URLSearchParams());
  }

  getConfigParameters(date: string){
    return this.restCommonUtil.jsonGet(`/api/v1/configParameter/?date=${date}`)
  }

  getCli(ragioneSociale: string, patritaIva: string){
     return this.restCommonUtil.jsonGet(`/api/v1/sales/cliFor/find?ragioneSociale=${ragioneSociale}`)
  }

  getBills(id:string){
    return this.restCommonUtil.jsonGet(`/api/v1/bills/listOfValues/${id}`)
  }

}
