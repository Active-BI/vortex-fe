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
export class TenantsService {
    constructor(private http: HttpClient, private toast: ToastrService) {}

    private baseUrl = environment.baseUrl;

    tenants() {
        return this.http.get(`${this.baseUrl}tenants`);
    }
    tenant(id: string) {
        return this.http.get(`${this.baseUrl}tenants/${id}`);
    }
    createTenant(payload) {
        return this.http.post(`${this.baseUrl}tenants`, payload);
    }
    updateTenant(id: string, payload) {
        return this.http.patch(`${this.baseUrl}tenants/${id}`, payload);
    }
    removeTenant(id) {
        return this.http.delete(`${this.baseUrl}tenants/${id}`);
    }
}
