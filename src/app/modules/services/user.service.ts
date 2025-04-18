import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PreRegisterUpdate } from './session.service';

export interface PreRegister {
    name: string;
    email: string;
    identification: string;
    tenant_id: string;
    role_id: string;
}

export interface getAllRequest {
    id: string;
    email: string;
    identification: string;
    name: string;
    tenant_id: string;
    tenant_name: string;
    role_id: string;
    role: { id: string; name: string } | null;
    User: {
        name: string;
        email: string;
        normalized_name: string;
        normalized_email: string;
        password_hash: string;
        last_access: Date;
        status: boolean;
        pre_register_id: string;
        id: string;
    };
}

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
    getUserByPagesExport(): Observable<any> {
        return this.http.get(`${this.baseUrl}page/user/user-by-page-export`, {
            responseType: 'blob',
        });
    }
    getUserByPages(): Observable<any> {
        return this.http.get(`${this.baseUrl}page/user/user-by-page`);
    }
    salvarConfiguracoesDePagina(data): Observable<any> {
        return this.http.patch(`${this.baseUrl}master/app-config`, data);
    }

    obterConfiguracoesDePagina(): Observable<any> {
        return this.http.get(`${this.baseUrl}master/app-config`);
    }
    getAllSessions(tenant_id): Observable<any> {
        return this.http.get<PreRegisterUpdate>(
            `${this.baseUrl}socket/all/` + tenant_id
        );
    }
    getGeneralSessions(tenant_id): Observable<any> {
        return this.http.get<PreRegisterUpdate>(
            `${this.baseUrl}socket-general/` + tenant_id
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

    resendTenant(body: { email: string; user_id: string }) {
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

    getUserById(userId: string): Observable<getAllRequest> {
        return this.http
            .get<getAllRequest>(`${this.baseUrl}user/${userId}`)
            .pipe(
                catchError((err) => {
                    this.toast.error(`Erro ao consultar usuário`, null, {
                        progressBar: true,
                        timeOut: 2000,
                    });
                    return throwError(err);
                })
            );
    }

    updateUser(user: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}user`, user);
    }

    createUser(user: PreRegister | any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}user`, user);
    }
}
