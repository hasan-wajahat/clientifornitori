import {ValidationError} from "./ValidationError";
/**
 * Created by Rocco on 19/10/2016.
 */

export class ErrorDebugDetail {

  className:string;
  message:string;
  fileName:string;
  methodName:string;
  lineNumber:string;
  requestURL:string;
  queryString:string;
  parameterMap:string;
  contentType:string;
  contentLength:number;
  characterEncoding:string;
  cookies:string;
  locale:string;
  protocol:string;
  method:string;
  scheme:string;
  authType:string;
  remoteUser:string;
  userPrincipal:string;
  requestedSessionId:string;
  contextPath:string;
  remoteHost:string;
  remotePort:number;
  remoteAddr:string;

  validationErrors:ValidationError[];

}
