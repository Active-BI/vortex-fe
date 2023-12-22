import { group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

export function trataRotas(rotas) {
    const pageList = rotas.map((page) => {
        return {
            page_group: page.Page_Group.title,
            page_group_icon: page.Page_Group.icon,
            page_group_id: page.Page_Group.id,
            page_type: page.page_type,
            link: page.link,
            report_id: page.report_id,
            group_id: page.group_id,
            name: page.title,
            id: page.id,
            roles: page.Page_Role.map((p) => p.Rls.name),
        };
    });

    const reducedPages = pageList.reduce((acc, cur) => {
        const findItem = acc.findIndex((a) => a.page_group === cur.page_group);
        if (findItem >= 0) {
            acc[findItem].children.push(cur);
            return acc;
        }
        acc.push({
            page_group: cur.page_group,
            icon: cur.page_group_icon,
            id: cur.page_group_id,
            page_id: cur.id,
            children: [cur],
        });

        return acc;
    }, []);

    return reducedPages;
}

@Injectable({
    providedIn: 'root',
})
export class GroupMasterService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseUrl;

    async getGroups() {
        const res = await this.http
            .get<any[]>(`${this.baseUrl}master/groups`)
            .toPromise();

        const pageList = res.map((group) => {
            return {
                id: group.id,
                page_group: group.title,
                page_group_icon: group.icon,
                pages_length: group.Page.length,
                roles: group.Page.map((p) =>
                    p.Page_Role.map((pr) => pr.Rls.name)
                ),
            };
        });

        return pageList;
    }

    async getGroup(id: string) {
        const group = await this.http
            .get<any>(`${this.baseUrl}master/groups/${id}`)
            .toPromise();
        if (group.Page.length < 1) {
            return {
                page_group: group.title,
                icon: group.icon,
            };
        }
        return trataRotas(group.Page).find((g) => g.id === group.id);
    }
}
