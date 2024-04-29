import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class TenantsService {
    constructor(private http: HttpClient, private toast: ToastrService) {}

    private baseUrl = environment.baseUrl;
    updateProjects(projects) {
        return this.http.post(`${this.baseUrl}tenants/projects`, projects);
    }
    getProjects(cliente) {
        return this.http.get(`${this.baseUrl}tenants/projects/`+ cliente);
    }
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
