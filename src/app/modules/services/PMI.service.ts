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
    constructor(
        private http: HttpClient,
        private toast: ToastrService,
    ) {}

    private baseUrl = environment.baseUrl;

    uploadFile(payload, group, type) {
        return this.http.post(
            `${this.baseUrl}files/upload/${group}/${type}`,
            payload,
        );
    }
    exportDataFile(group, type: string) {
        return this.http.get(
            `${this.baseUrl}files/download-pbi-data/${group}/${type}`,
            {
                responseType: 'blob',
            },
        );
    }
    refreshDataset(group, type) {
        return this.http.get(
            `${this.baseUrl}pbi-report/refresh/${group}/${type}`,
        );
    }
    refreshDataflow(group, type) {
        return this.http.get(
            `${this.baseUrl}pbi-report/refresh-dataflow/${group}/${type}`,
        );
    }
    exportExampleFile(group, tipoRelatorio: string) {
        return this.http.get(
            `${this.baseUrl}files/get-template/${group}/${tipoRelatorio}`,
            {
                responseType: 'blob',
            },
        );
    }
    tenants() {
        return this.http.get(`${this.baseUrl}InserirDadosMock/tenants`);
    }

    getDataSetInfo(): Observable<any[]> {
        return this.http.get(`${this.baseUrl}page/datasetInf`) as any;
    }
}
