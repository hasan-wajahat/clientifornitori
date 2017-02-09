/**
 * Created by Rocco on 03/11/2016.
 */

export class DebugErrorDetail {
  /** Class name */
  className:string;
  /** Gets a short message summarising the exception. */
  message:string;
  /** Full exception stack trace */
  stackTrace:string;
  fileName:string;
  methodName:string;
  lineNumber:number;

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
}
