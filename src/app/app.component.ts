
import { Component } from '@angular/core';
import {TranslateService} from "ng2-translate/ng2-translate";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app works!';
  login:boolean = false;

  constructor(private translate: TranslateService) {

    translate.addLangs(["en", "it"]);
    translate.setDefaultLang('it');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|it/) ? browserLang : 'en');
  }

}
