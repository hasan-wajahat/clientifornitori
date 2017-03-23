/**
 * Created by root on 3/7/17.
 */

export class CommonUtil {

  /**
   * xxxxx
   */
  public static setAllNullStringToNull(obj:any) : any{

    let arrayOfKeys = Object.keys(obj);
    arrayOfKeys.forEach(key => {
      if(obj[key] == 'null'){
        obj[key]=null;
      }
    });

    return obj;
  }

}
