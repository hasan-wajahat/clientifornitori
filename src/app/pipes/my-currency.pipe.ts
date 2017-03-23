import { Pipe, PipeTransform } from "@angular/core";

const PADDING = "000000";

@Pipe({ name: "myCurrency" })
export class MyCurrencyPipe implements PipeTransform {

  private PREFIX: string;
  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;
  private SUFFIX: string;
  private DECIMAL_SEPARATOR_VALUEOF:string;

  constructor() {

    this.PREFIX = ''
    this.DECIMAL_SEPARATOR = ",";
    this.THOUSANDS_SEPARATOR = ".";
    this.SUFFIX = ' €'

    this.DECIMAL_SEPARATOR_VALUEOF = ".";
  }

  transform(value: string, fractionSize: number = 2): string {

    //console.log("MyCurrencyPipe - transform: " + value);
    let val = (value || "").toString().replace(/\./g, ",");

    let [ integer, fraction = "" ] = (val || "").toString()
      .split(this.DECIMAL_SEPARATOR);

    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : "";

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);
    //console.log("MyCurrencyPipe - transform - RETURN: " + this.PREFIX + integer + fraction + this.SUFFIX);

    return this.PREFIX + (integer || '0') + fraction + this.SUFFIX;
  }

  parse(value: string, fractionSize: number = 2): string {

    //console.log("MyCurrencyPipe - parse: " + value);

    let [ integer, fraction = "" ] = (value || "").replace(this.PREFIX, "")
                                                  .replace(this.SUFFIX, "")
                                                  .split(this.DECIMAL_SEPARATOR);

    integer = integer.replace(/\./g, "");

    fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? this.DECIMAL_SEPARATOR_VALUEOF + (fraction + PADDING).substring(0, fractionSize)
      : "";

    //console.log("MyCurrencyPipe - parse - RETURN: " + integer + fraction);

    return integer + fraction;
  }

}
