import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = sessionStorage.getItem('accessToken');
    console.log('JWT TOKEN =>', token );


    if (!token) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
     console.log('REQUEST HEADERS =>', authReq.headers);
    return next.handle(authReq);
  }
}
