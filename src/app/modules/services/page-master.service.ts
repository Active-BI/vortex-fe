import { group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { trataRotas } from './group-master.service';

@Injectable({
    providedIn: 'root',
})
export class PageMasterService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseUrl;
    postGroup(group) {
        return this.http.post(`${this.baseUrl}master/groups`, group);
    }
    deleteGroup(group_id) {
        return this.http.delete(`${this.baseUrl}master/groups/${group_id}`);
    }
    updateGroup(group_id, group) {
        return this.http.patch(
            `${this.baseUrl}master/groups/${group_id}`,
            group
        );
    }

    deleteChildrenPage(page_id) {
        return this.http.delete(`${this.baseUrl}master/page/${page_id}`);
    }

    postPage(dashboadList, userId) {
        return this.http.post(
            `${this.baseUrl}master/pages/${userId}`,
            dashboadList
        );
    }
    getPageByTenantId(tenantId) {
        return this.http.get(
            `${this.baseUrl}master/pages/by-tenant/${tenantId}`
        );
    }
    getAdminUsersByTenantId(tenantId) {
        return this.http.get(`${this.baseUrl}master/pages/user/${tenantId}`);
    }
    getPages() {
        return this.http.get(`${this.baseUrl}master/pages`);
    }
    patchPages(id: string, page) {
        return this.http.patch(`${this.baseUrl}master/pages/${id}`, page);
    }
    async getPageById(id) {
        return await this.http
            .get<any[]>(`${this.baseUrl}master/pages/` + id)
            .toPromise();
    }
    async getPagesByGroup(id = '') {
        const res = await this.http
            .get<any[]>(`${this.baseUrl}master/pages`)
            .toPromise();

        const pagesReduced = trataRotas(res);
        if (id !== '') {
            return pagesReduced.find((group) => group.id === id);
        }

        return pagesReduced;
    }
}
