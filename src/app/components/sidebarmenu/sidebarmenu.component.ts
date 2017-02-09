import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-sidebarmenu',
  templateUrl: 'sidebarmenu.component.html',
  styleUrls: ['sidebarmenu.component.css']
})
export class SidebarmenuComponent implements OnInit {


  ngOnInit() {
  }

  //constructor(private _loc:Location) {}

  // constructor(private _loc:Location, router: Router) {
  //   router.events.subscribe(s => {
  //     if (s instanceof NavigationEnd) {
  //       const tree = router.parseUrl(router.url);
  //       if (tree.fragment) {
  //         // you can use DomAdapter
  //         const element = document.querySelector("#" + tree.fragment);
  //         if (element) { element.scrollIntoView(element); }
  //       }
  //     }
  //   });
  // }

  constructor(private _loc:Location, router: Router) {
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        var isDysplay = $('.navbar-toggle').css('display') == 'none';

        //alert('VISIBILE: ' + isVisible + '   HIDDEN: ' + isHidden + 'DISPLAY: ' + isDysplay);

        if( !isDysplay ){
          $('#metisCollapsable').removeClass('collapse in');
          $('#metisCollapsable').addClass('collapse');
        }
      }
    });
  }

  getCurrentPath() {
    //console.log('PATH:' + this._loc.path());
    return this._loc.path();
  }

  getActive(path:string): boolean{

    console.log("PATH IN     :" + path);
    console.log("CURRENT PATH:" + this.getCurrentPath());
    let isActive = false;

    if(path.indexOf('/home/dashboard') >= 0 &&  this.getCurrentPath() == ''){
      isActive = true;
    }
    else if(this.getCurrentPath().indexOf('path') >= 0 ){
      isActive = true;
    }

    //console.log('isActive:' + isActive)

    return isActive;
  }

  collapseMenuInMobileMode(){

    // // var isVisible = $('#metisCollapsable').is(':visible');
    // // var isHidden = $('#metisCollapsable').is(':hidden');
    //
    // var isDysplay = $('.navbar-toggle').css('display') == 'none';
    //
    // //alert('VISIBILE: ' + isVisible + '   HIDDEN: ' + isHidden + 'DISPLAY: ' + isDysplay);
    //
    // if( !isDysplay ){
    //   $('#metisCollapsable').removeClass('collapse in');
    //   $('#metisCollapsable').addClass('collapse');
    // }

  }


}
