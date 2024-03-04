import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';

interface ICargos {
    name: string;
    id: string;
}

@Injectable({
    providedIn: 'root',
})
export class OfficeService {
    constructor(private http: HttpClient, private toast: ToastrService) {}

    private baseUrl = environment.baseUrl;

    getOffices(): Observable<ICargos[]> {
        return this.http.get<ICargos[]>(`${this.baseUrl}office`).pipe(
            catchError((err) => {
                ('');
                this.toast.error(`Erro ao consultar cargos`, null, {
                    progressBar: true,
                    timeOut: 2000,
                });
                return throwError(err);
            })
        );
    }

    upsertCargo(cargo: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}office`, cargo).pipe(
            catchError(({ error }) => {
                this.toast.error(error.message, null, {
                    progressBar: true,
                    timeOut: 2000,
                });
                return throwError(error.message);
            })
        );
    }

    deleteUser(userId: string): Observable<ICargos> {
        return this.http
            .delete<ICargos>(`${this.baseUrl}office/${userId}`)
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
