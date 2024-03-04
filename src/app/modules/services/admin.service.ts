import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';

export interface PreRegister {
    name: string;
    email: string;
    identification: string;
    tenant_id: string;
    role_id: string;
}
export interface PreRegisterUpdate {
    id: string;
    name: string;
    email: string;
    tenant_id: string;
    identification: string;
    role_id: string;
}
export interface getAllRequest {
    id: string;
    email: string;
    identification: string;
    name: string;
    tenant_id: string;
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
    private socketUrl = environment.socketUrl;
    getSessions(tenant_id): Observable<any> {
        return this.http.get<PreRegisterUpdate>(
            `${this.baseUrl}socket/` + tenant_id
        );
    }
    /*   getUserByPagesExport(): Observable<any> {
        return this.http.get(`${this.baseUrl}page/user/user-by-page-export`,
        {
            responseType: 'blob',
        });
    } */
    /* getUserByPages(): Observable<any> {
        return this.http.get(`${this.baseUrl}page/user/user-by-page`)
    } */
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
    // getUsers(): Observable<getAllRequest[]> {
    //     return this.http.get<getAllRequest[]>(`${this.baseUrl}user`).pipe(
    //         catchError((err) => {
    //             ('');
    //             this.toast.error(`Erro ao consultar usuários`, null, {
    //                 progressBar: true,
    //                 timeOut: 2000,
    //             });
    //             return throwError(err);
    //         })
    //     );
    // }

    // resendEmail(body: { email: string; id: string }) {
    //     return this.http
    //         .post<getAllRequest[]>(`${this.baseUrl}user/resend`, body)
    //         .pipe(
    //             catchError((err) => {
    //                 ('');
    //                 this.toast.error(`Erro ao reenviar email`, null, {
    //                     progressBar: true,
    //                     timeOut: 2000,
    //                 });
    //                 return throwError(err);
    //             })
    //         );
    // }

    // master
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

    // deleteUser(userId: string): Observable<getAllRequest> {
    //     return this.http
    //         .delete<getAllRequest>(`${this.baseUrl}user/${userId}`)
    //         .pipe(
    //             catchError((err) => {
    //                 this.toast.error(`Erro ao remover usuário`, null, {
    //                     progressBar: true,
    //                     timeOut: 2000,
    //                 });
    //                 return throwError(err);
    //             })
    //         );
    // }
}
