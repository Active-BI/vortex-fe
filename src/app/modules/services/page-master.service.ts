import { group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { trataRotas } from './group-master.service';
import { catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class PageMasterService {
    constructor(private http: HttpClient, private toastr: ToastrService) {}

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
        return this.http.delete(`${this.baseUrl}master/pages/${page_id}`);
    }

    postReportsToTennant(dashboadList, userId) {
        return this.http.post(
            `${this.baseUrl}master/pages/${userId}`,
            dashboadList
        );
    }
    patchReportsToTennant(dashboadList, userId) {
        return this.http.patch(
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

    PostAdminUsersByTenantId(tenantId, body) {
        return this.http.post(
            `${this.baseUrl}user/user/${tenantId}`,
            body
        );
    }
    getPages() {
        return this.http.get(`${this.baseUrl}master/pages`);
    }
    patchPages(id: string, page) {
        return this.http.patch(
            `${this.baseUrl}master/pages/edit-page/${id}`,
            page
        );
    }
    postPage(page) {
        return this.http.post(`${this.baseUrl}master/pages`, page);
    }

    deletePage(id) {
        return this.http.delete(`${this.baseUrl}master/pages/${id}`);
    }

    getPage(id) {
        return this.http.get<any>(`${this.baseUrl}master/pages/` + id).pipe(
            catchError((err) => {
                this.toastr.error('Falha ao obter página');
                return err;
            })
        )
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
