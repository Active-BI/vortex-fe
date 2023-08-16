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
export class AdminRequestService {
    constructor(private http: HttpClient, private toast: ToastrService) {}

    private baseUrl = environment.baseUrl;

    allAdminRequests() {
        return this.http.get(`${this.baseUrl}admin-request`);
    }
    blockAdminRequests(id) {
        return this.http.delete(`${this.baseUrl}admin-request/${id}`);
    }
    allowAdminRequests(id, tenant_id) {
        return this.http.get(
            `${this.baseUrl}admin-request/accept/${id}/${tenant_id}`
        );
    }
    allowAdminRequestsAndCreateTenant(id, tenant) {
        return this.http.post(
            `${this.baseUrl}admin-request/accept-and-create-tenant/${id}`,
            tenant
        );
    }

    getConfirmationAdminRequests(token) {
        return this.http.get(`${this.baseUrl}request-access/${token}`);
    }

    postAdminRequests(payload) {
        return this.http.post(`${this.baseUrl}request-access`, payload);
    }
}
