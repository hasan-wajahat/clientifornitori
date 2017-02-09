import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service'
import {UserService} from "../../services/authentication/user.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  providers: [HeaderService]
})
export class HeaderComponent implements OnInit {

  constructor(private _headerService : HeaderService, private _userService:UserService){ }


  ngOnInit() {

  }

  // avatarImage48 = 'app/images/avatar/roccosavella_48.jpg';
  // avatarImage128 = 'app/images/avatar/128.jpg';

  avatarImage48 = this._headerService.getAvatarImage48();
  avatarImage128 = this._headerService.getAvatarImage128();
  username = this._headerService.getUsername();
  listOfNews = this._headerService.getNews();
  numberOfNews = this._headerService.getNumberOfNews();

  logout() {
    this._userService.logout();
  }

}
