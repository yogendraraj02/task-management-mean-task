import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
const TOKEN_HEADER_KEY = 'authorization';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private token : StorageService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    console.log("outgoing request",req);
    const token = this.token.getToken();
    req = req.clone({
      headers : req.headers.set(TOKEN_HEADER_KEY,`${token}`).set("ngrok-skip-browser-warning", "69420").set('Access-Control-Allow-Origin' , '*'),
      // withCredentials: true,
    });
    
    console.log("new outgoing request",req);
    return next.handle(req);
  }
}


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
];