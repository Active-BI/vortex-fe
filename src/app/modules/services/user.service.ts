import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { getAllRequest } from './admin.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient, private toast: ToastrService) {}
    private baseUrl = environment.baseUrl;

    deleteUser(userId: string): Observable<getAllRequest> {
        return this.http
            .delete<getAllRequest>(`${this.baseUrl}user/${userId}`)
            .pipe(
                catchError((err) => {
                    this.toast.error(`Erro ao remover usuário`, null, {
                        progressBar: true,
                        timeOut: 2000,
                    });
                    return throwError(err);
                })
            );
    }

    resendEmail(body: { email: string; id: string }) {
        return this.http
            .post<getAllRequest[]>(`${this.baseUrl}user/resend`, body)
            .pipe(
                catchError((err) => {
                    ('');
                    this.toast.error(`Erro ao reenviar email`, null, {
                        progressBar: true,
                        timeOut: 2000,
                    });
                    return throwError(err);
                })
            );
    }

    getUsers(): Observable<getAllRequest[]> {
        return this.http.get<getAllRequest[]>(`${this.baseUrl}user`).pipe(
            catchError((err) => {
                ('');
                this.toast.error(`Erro ao consultar usuários`, null, {
                    progressBar: true,
                    timeOut: 2000,
                });
                return throwError(err);
            })
        );
    }
}
