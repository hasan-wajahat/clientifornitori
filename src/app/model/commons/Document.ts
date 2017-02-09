import {TipoDocumento} from "./TipoDocumento";
/**
 * Created by Rocco on 17/10/2016.
 */

export class Document {

  id:number;
  userId:string;
  nomeLogico:string;
  nomeFisico:string;
  tipo:TipoDocumento;
  dimensione:number;
  contentType:string;
  insUser:number;
  modUser:number;

}
