import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class PageMasterService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseUrl;
    postPage(dashboadList, userId) {
        return this.http.post(
            `${this.baseUrl}master/dashboards/${userId}`,
            dashboadList
        );
    }
    getPageById(tenantId) {
        return this.http.get(`${this.baseUrl}master/dashboards/${tenantId}`);
    }
    getAdminUsersByTenantId(tenantId) {
        return this.http.get(
            `${this.baseUrl}master/dashboards/user/${tenantId}`
        );
    }
    getPages() {
        return this.http.get(`${this.baseUrl}master/dashboards`);
    }
}
