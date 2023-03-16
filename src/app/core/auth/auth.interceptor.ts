import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
    private pendingRequests = 0;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) {
        console.log('token');
    }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.url.includes('token-login')) {
            return next.handle(req.clone()).pipe(
                tap(
                    (suc) => {},
                    (err) => {
                        if (err.status === 401) {
                            this.toastr.error(err.error.message);

                            localStorage.removeItem('token');
                            this.router.navigate(['/auth/login']);
                        }
                    }
                )
            );
        }
        if (req.url.includes('auth') || this.router.url.includes('auth')) {
            return next.handle(req.clone()).pipe(
                tap(
                    (suc) => {},
                    (err) => {
                        if (err.status === 400) {
                            this.toastr.error(err.error.errorType);
                        }
                    }
                )
            );
        }
        let token = '';
        if (localStorage.getItem('token') !== null) {
            token = String(localStorage.getItem('token'));
            token = JSON.parse(token);
        } else {
            localStorage.removeItem('token');
            this.router.navigate(['/auth/login']);
        }
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token),
        });

        return next.handle(authReq).pipe(
            tap(
                (suc) => {},
                (err) => {
                    if (err.status === 400) {
                        this.toastr.error(err.error.errorType);
                    }
                    if (err.status === 401) {
                        this.toastr.error(err.error.errorType);

                        localStorage.removeItem('token');
                        this.router.navigate(['/auth/login']);
                    }
                    if (err.status === 403) {
                        this.toastr.error('Acesso negado');
                        localStorage.removeItem('token');
                        this.router.navigate(['/auth/login']);
                    }
                    this.pendingRequests--;
                }
            ),
            finalize(() => {})
        );
    }
}
