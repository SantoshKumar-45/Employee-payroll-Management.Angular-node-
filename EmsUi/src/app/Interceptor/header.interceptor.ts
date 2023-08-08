import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const Accesstoken = localStorage.getItem('token');
    // Only  Acces  Token Resolve this Code 
    if (Accesstoken) {

      request = request.clone({
        setHeaders: {
          'authorization': ` ${Accesstoken}`
        }
      })
    }
    return next.handle(request);

  }



}
