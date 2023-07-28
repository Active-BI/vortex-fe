import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseUrl;

    getDashboards() {
        return this.http.get(`${this.baseUrl}dashboard`);
    }

    postDashboards(dashboadList, userId) {
        return this.http.post(
            `${this.baseUrl}dashboard/${userId}`,
            dashboadList
        );
    }
    postMasterDashboards(dashboadList, userId) {
        return this.http.post(
            `${this.baseUrl}master/dashboards/${userId}`,
            dashboadList
        );
    }
    getMasterDashBoardById(tenantId) {
        return this.http.get(`${this.baseUrl}master/dashboards/${tenantId}`);
    }
    getAdminUsersByTenantId(tenantId) {
        return this.http.get(
            `${this.baseUrl}master/dashboards/user/${tenantId}`
        );
    }
    getMasterDashBoard() {
        return this.http.get(`${this.baseUrl}master/dashboards`);
    }
    exportFile(tipoRelatorio: string) {
        console.log(tipoRelatorio);
        return this.http.get(`${this.baseUrl}arquivos/${tipoRelatorio}`, {
            responseType: 'blob',
        });
    }
    tenants() {
        return this.http.get(`${this.baseUrl}InserirDadosMock/tenants`);
    }
}
