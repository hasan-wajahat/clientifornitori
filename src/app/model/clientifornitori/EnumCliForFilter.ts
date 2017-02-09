/**
 * Created by Rocco on 27/09/2016.
 */

export class EnumCliForFilter {

   private static myArray = {
      'intestazioneCognomeNome':'INTESTAZIONE',
      'pIvaCf':'CODICEFISCALE',
      'email':'EMAIL',
      'indirizzo':'INDIRIZZO',
      'citta':'CITTA'
   };

   public static getValue(key:string) : string {
     let val:string = this.myArray[key];
      console.log('VAL: ' + val);
     if(val == null || val.trim().length == 0){
       return 'INTESTAZIONE';
     }
     return val;
   }

}
