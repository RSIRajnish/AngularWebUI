import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    token = localStorage.getItem('token');
    constructor() { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer mytoken"
            }
        });
        return next.handle(request)
            .pipe(catchError(x => this.handleAuthError(x)));
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            // TODO: write the action  
        }
        return throwError(err);
    }
}
