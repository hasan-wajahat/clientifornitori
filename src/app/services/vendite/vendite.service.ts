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

}
