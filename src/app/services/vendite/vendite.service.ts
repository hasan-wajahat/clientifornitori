import {Injectable} from '@angular/core';
import {RestCommonUtilsService} from "../../utils/rest-common-utils.service";

@Injectable()
export class VenditeService {

  constructor(private restCommonUtil:RestCommonUtilsService) {}

  getFattureVendite() {
    //return this.restCommonUtil.jsonGet('app/resources/data/fatture-vendite.json');
  }

}
