import { Injectable } from '@angular/core';
import {RestCommonUtilsService} from "../../utils/rest-common-utils.service";
import {User} from "../../model/user/User";

@Injectable()
export class HeaderService {

  user:User;

  constructor(
              private restCommonUtil:RestCommonUtilsService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('UserData'));
  }

  getAvatarImage48(){
    return this.restCommonUtil.retriveResourcePath(this.user.logo.id);
  }

  getAvatarImage128(){
    return this.restCommonUtil.retriveResourcePath(this.user.logo.id);
  }

  getUsername(){
    return this.user.intestazione;
  }

  getNews(){
    let newsList:string[] = ['Questa è la prima news', 'Luca Valterio torna il primo settembre', "Queste news vengono prese da header.service", "Questa è l'ultima news della giornata"];
    return newsList;
  }

  getNumberOfNews(){
    return this.getNews().length;
  }
}
