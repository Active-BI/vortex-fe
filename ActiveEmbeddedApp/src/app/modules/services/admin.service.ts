import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';

export interface PreRegister {
    name: string;
    email: string;
    identification: string;
    role_id: string;
}
export interface PreRegisterUpdate {
    id: string;
    name: string;
    email: string;
    identification: string;
    role_id: string;
}
export interface getAllRequest {
    id: string;
    email: string;
    identification: string;
    name: string;
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
export class AdminService {
    constructor(private http: HttpClient, private toast: ToastrService) {}

    private baseUrl = environment.baseUrl;

    getUsers(): Observable<getAllRequest[]> {
        return this.http
            .get<getAllRequest[]>(`${this.baseUrl}pre-register`)
            .pipe(
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

    getUserById(userId: string): Observable<getAllRequest> {
        return this.http
            .get<getAllRequest>(`${this.baseUrl}pre-register/${userId}`)
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

    updateUser(user: any): Observable<getAllRequest> {
        return this.http
            .put<getAllRequest>(`${this.baseUrl}pre-register`, user)
            .pipe(
                catchError((err) => {
                    this.toast.error(`Erro ao atualizar usuários`, null, {
                        progressBar: true,
                        timeOut: 2000,
                    });
                    return throwError(err);
                })
            );
    }

    createPreRegister(user: PreRegister): Observable<PreRegisterUpdate> {
        return this.http
            .post<PreRegisterUpdate>(`${this.baseUrl}pre-register`, user)
            .pipe(
                catchError((err) => {
                    this.toast.error(`Erro ao atualizar usuários`, null, {
                        progressBar: true,
                        timeOut: 2000,
                    });
                    return throwError(err);
                })
            );
    }

    deleteUser(userId: string): Observable<getAllRequest> {
        return this.http
            .delete<getAllRequest>(`${this.baseUrl}pre-register/${userId}`)
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
}
