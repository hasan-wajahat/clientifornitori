import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { MyCurrencyPipe } from "../pipes/my-currency.pipe";
import {NgModel} from "@angular/forms";

@Directive({
  selector: "[myCurrencyFormatter]",
  providers: [NgModel],
  host: {
    '(ngModelChange)' : 'onInputChange($event)'
  }
})
export class MyCurrencyFormatterDirective implements OnInit {

  private el: any;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: MyCurrencyPipe,
    private model:NgModel
  ) {
    this.el = this.elementRef.nativeElement;

  }

  ngOnInit() {
    this.el.value = this.currencyPipe.transform(this.el.value);
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
    this.el.value = this.currencyPipe.parse(value); // opossite of transform
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    this.el.value = this.currencyPipe.transform(value);
  }

  onInputChange(event){
    var newValue = (event || "");
    newValue = newValue.replace(/[^\d,\.,]+/g, '');
    newValue = newValue.replace(/[,\.](.*[,\.])/g, '$1');
    newValue = newValue.replace(',','.');
    console.log("NGMODEL REPLACE virgola: " + newValue);
    this.model.valueAccessor.writeValue(newValue);
    //this.model.viewToModelUpdate(newValue);
  }


  // @HostListener("keyup", ["$event.target.value"])
  // onKeyUp(value) {
  //   console.log("HostListener- keyUp");
  //   this.el.value = String(value).replace(',','.');
  // }
  //
  // @HostListener("change", ["$event.target.value"])
  // onChange(value) {
  //   console.log("HostListener- onChange");
  //   this.el.value = 11111;
  // }
}
