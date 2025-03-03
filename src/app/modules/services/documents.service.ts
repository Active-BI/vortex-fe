import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DocumentsService {
    constructor(private http: HttpClient,private toastr: ToastrService) {}

    private baseUrl = environment.baseUrl;
    getClientProjectFilters(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}documents/client-project-filter`).pipe(
            catchError((err) => {
                if (err.status !== 200) {
                this.toastr.error(err.error.message);}
                return throwError(() => new Error());
            })
        );
    }
    getFiles(tenant_id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}documents/files/` + tenant_id).pipe(
            catchError((err) => {
                if (err.status !== 200) {
                this.toastr.error(err.error.message);}
                return throwError(() => new Error());
            })
        );
    }
    DeleteFile(id): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}documents/` + id).pipe(
            catchError((err) => {
                if (err.status !== 200) {
                    this.toastr.error('Falha ao excluir arquivo');
                    }
                return throwError(() => new Error());
            })
        );
    }
    DownloadFile(id): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/octet-stream'
          });
        return this.http.get<any>(`${this.baseUrl}documents/download/` + id,{ 
            responseType: 'blob' as 'json',
            headers: headers,
              }).pipe(
                catchError((err) => {
                    if (err.status !== 200) {
                        console.log(err)
                    this.toastr.error('Falha ao obter arquivo');
                }
                    return throwError(() => new Error());
                })
            );
    }
    UploadFiles(file: FormData, tenant_id: string, projects: string[], description: string): Observable<any> {
        const payload = new FormData();
        payload.append('body', JSON.stringify({projects, description}));
        payload.append('files',file.get('files'));
        return this.http.post<any>(`${this.baseUrl}documents/${tenant_id}`, payload ).pipe(
            catchError((err) => {
                if (err.status !== 200) {
                    this.toastr.error(err.error.message);
                }
                return throwError(() => new Error());
            })
        );
    }
}
