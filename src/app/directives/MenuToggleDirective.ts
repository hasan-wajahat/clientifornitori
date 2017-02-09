import {Directive, OnInit, OnDestroy, ElementRef} from "@angular/core";
declare var $: any

@Directive({
  selector: '.ui.toggle'
})
export class MenuToggleDirective implements OnInit, OnDestroy {

  constructor(private el: ElementRef) {
  }

  public ngOnInit() {
    $(this.el.nativeElement).dropdown();
  }

  public ngOnDestroy() {
    $(this.el.nativeElement).dropdown('destroy');
  }
}
