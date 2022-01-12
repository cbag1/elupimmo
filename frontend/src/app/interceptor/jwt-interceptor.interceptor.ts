import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    //console.log(jwt);
    if (jwt) {
      // console.log(jwt.token);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt.token}`
        }
      });
    }
    console.log(request);
    return next.handle(request);
  }
}
