/**
 * Created by Rocco on 03/11/2016.
 */

import {DebugErrorDetail} from "./DebugErrorDetail";

export class ErrorDetail {

  httpStatus:number;
  httpReason:string;
  exception:string;
  title:string;
  detail:string;
  timeStamp:string;
  path:string;
  code:number;
  // Cause Exception details
  causeDetail:string;
  causeCode:number;

  type:string;
  debugDetails:DebugErrorDetail;
  validationErrors:any;

}

