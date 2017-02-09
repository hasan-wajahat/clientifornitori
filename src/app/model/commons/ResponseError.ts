import {ErrorDebugDetail} from "./ErrorDebugDetail";
/**
 * Created by Rocco on 19/10/2016.
 */

export class ResponseError {

  httpStatus:string;
  httpReason:string;
  exception:string;
  title:string;
  detail:string;

  timeStamp:string;
  path:string;
  code:number;
  type:string;
  debugDetails:ErrorDebugDetail;


}
