import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
    /**
     * Constructor
     */

    constructor(private _router: Router, private toast: ToastrService) {}

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Clone the request object
        let newReq = req.clone();
        req.url;
        if (
            localStorage.getItem('token') == null &&
            this._router.url.includes('auth')
        ) {
            newReq = req.clone({
                headers: req.headers.set(
                    'Authorization',
                    `Bearer ${localStorage.getItem('tempToken')}`
                ),
            });
        }
        try {
            if (localStorage.getItem('token')) {
                newReq = req.clone({
                    headers: req.headers.set(
                        'Authorization',
                        'Bearer ' + JSON.parse(localStorage.getItem('token'))
                    ),
                });
            }
        } catch (e) {
            localStorage.clear();
        }

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {
                // Catch "401 Unauthorized" responses

                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401
                ) {
                    if (
                        location.hash === '#/auth/tfa'
                        // location.hash.includes('reset-pass')
                    ) {
                        // console.log(error);
                        this.toast.error(error.error.message);
                        this._router.navigate(['/auth/sign-in']);
                        return;
                    } else {
                        this.toast.error(error.error.message);
                        return;
                    }
                }
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 403 &&
                    !location.hash.includes('access-request')
                ) {
                    this.toast.error('Sem permissão para modificações');
                    this._router.navigate(['/auth/sign-out']);
                }
                return throwError(error);
            })
        );
    }
}
