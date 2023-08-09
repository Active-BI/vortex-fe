import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PMIService {
    constructor(private http: HttpClient, private toast: ToastrService) {}

    private baseUrl = environment.baseUrl;

    uploadFile(payload, type) {
        return this.http.post(
            `${this.baseUrl}pbi-report/post-file/${type}`,
            payload
        );
    }
    exportDataFile(tipoRelatorio: string) {
        return this.http.get(
            `${this.baseUrl}pbi-report/get-file/${tipoRelatorio}`,
            {
                responseType: 'blob',
            }
        );
    }
    refreshDataset(type) {
        return this.http.get(`${this.baseUrl}pbi-report/refresh/${type}`);
    }
    refreshDataflow(type) {
        return this.http.get(
            `${this.baseUrl}pbi-report/refresh-dataflow/${type}`
        );
    }
    exportExampleFile(tipoRelatorio: string) {
        return this.http.get(
            `${this.baseUrl}pbi-report/get-template/${tipoRelatorio}`,
            {
                responseType: 'blob',
            }
        );
    }
    tenants() {
        return this.http.get(`${this.baseUrl}InserirDadosMock/tenants`);
    }
}
