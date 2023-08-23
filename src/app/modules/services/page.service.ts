import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PageService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseUrl;

    getDashboards() {
        return this.http.get(`${this.baseUrl}page`);
    }

    async getDashboardsByUserId(userId) {
        const response = await this.http
            .get(`${this.baseUrl}page/${userId}`)
            .toPromise();
        return response;
    }

    postDashboards(PageUserList, userId) {
        return this.http.post(`${this.baseUrl}page/${userId}`, PageUserList);
    }

    exportFile(tipoRelatorio: string) {
        return this.http.get(`${this.baseUrl}arquivos/${tipoRelatorio}`, {
            responseType: 'blob',
        });
    }
    tenants() {
        return this.http.get(`${this.baseUrl}InserirDadosMock/tenants`);
    }
}
