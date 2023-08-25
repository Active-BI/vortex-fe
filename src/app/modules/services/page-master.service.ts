import { group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PageMasterService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseUrl;
    postGroup(group_name) {
        return this.http.post(`${this.baseUrl}master/group`, group_name);
    }
    deleteGroup(group_id) {
        return this.http.delete(`${this.baseUrl}master/group/${group_id}`);
    }
    postPage(dashboadList, userId) {
        return this.http.post(
            `${this.baseUrl}master/pages/${userId}`,
            dashboadList
        );
    }
    getPageById(tenantId) {
        return this.http.get(`${this.baseUrl}master/pages/${tenantId}`);
    }
    getAdminUsersByTenantId(tenantId) {
        return this.http.get(`${this.baseUrl}master/pages/user/${tenantId}`);
    }
    getPages() {
        return this.http.get(`${this.baseUrl}master/pages`);
    }

    async getPagesByGroup(id = '') {
        const res = await this.http
            .get<any[]>(`${this.baseUrl}master/pages`)
            .toPromise();

        const pageList = res.map((page) => {
            return {
                page_group: page.Page_Group.title,
                page_group_id: page.Page_Group.id,
                link: page.link,
                report_id: page.report_id,
                group_id: page.group_id,
                name: page.title,
                id: page.id,
                roles: page.Page_Role.map((p) => p.Rls.name),
            };
        });

        const pagesReduced = pageList.reduce((acc, cur) => {
            const findItem = acc.findIndex(
                (a) => a.page_group === cur.page_group
            );
            if (findItem >= 0) {
                acc[findItem].children.push(cur);
                return acc;
            }
            acc.push({
                page_group: cur.page_group,
                id: cur.page_group_id,
                children: [cur],
            });

            return acc;
        }, []);
        if (id !== '') {
            return pagesReduced.find((group) => group.id === id);
        }

        return pagesReduced;
    }
}
