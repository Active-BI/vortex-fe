/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { PageService } from 'app/modules/services/page.service';
import jwtDecode from 'jwt-decode';
import { ReplaySubject } from 'rxjs';
// report/group
const dataAdmin = {
    roles: ['Admin'],
};
const dataAdminUser = {
    roles: ['Admin', 'User'],
};
interface DashboardUser {
    id: string;
    type: string;
    title: string;
    link: string;
    group_id: string;
    report_id: string;
    table_name: string;
    page_group_id: string;
    Page_Group: {
        id: string;
        title: string;
        icon: string;
    };
    Page_Role: string[];
}

class CreateRoutes {
    static BasicRoute(
        roles: string[] = [],
        id: string,
        title: string,
        link: string
    ): FuseNavigationItem {
        return {
            data: { roles },
            id,
            title,
            type: 'basic',
            link: link,
        };
    }

    static ReportUploadRoute(
        roles: string[] = [],
        id: string,
        title: string,
        link: string
    ): FuseNavigationItem {
        return {
            data: { roles },
            id,
            title,
            type: 'basic',
            link: 'view-report-type/' + link,
        };
    }

    static CollapsableRoute(
        id: string,
        title: string,
        icon: string,
        roles
    ): FuseNavigationItem {
        return {
            data: { roles },
            id,
            title,
            type: 'collapsable',
            icon,
            children: [],
        };
    }
}
export const defaultRoute: FuseNavigationItem[] = [
    {
        data: { roles: ['User', 'Admin', 'Master'] },
        id: 'inicio',
        title: 'Inicio',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: 'inicio',
    },
];
export const defaultNavigation: FuseNavigationItem[] = [];
@Injectable({
    providedIn: 'root',
})
export class MenuItemService {
    sub = new ReplaySubject();
    intervalId: any;
    constructor(private router: Router, private pageService: PageService) {
        this.getNewRoutes();
    }
    getNewRoutes() {
        return Promise.all([localStorage.getItem('token')])
            .then((e) => {
                if (e[0]) {
                    let decoded;
                    try {
                        decoded = jwtDecode(JSON.parse(e[0])) as any;
                    } catch (e) {
                        localStorage.clear();
                        this.router.navigate(['auth/login']);
                    }
                    const userId: DashboardUser[] = decoded.userId;
                    return userId;
                }
            })
            .then((userId) => {
                return Promise.resolve(
                    this.pageService.getDashboardsByUserId(userId)
                ).then((rotas: any) => {
                    const dashUsers = rotas;
                    localStorage.setItem(
                        'userRoutes',
                        JSON.stringify(dashUsers)
                    );
                    const routes: FuseNavigationItem[] = [];
                    routes.push(...defaultRoute);

                    const collapsableRoutes = dashUsers.reduce((acc, cur) => {
                        if (!acc[cur.Page_Group.title]) {
                            acc[cur.Page_Group.title] =
                                CreateRoutes.CollapsableRoute(
                                    cur.Page_Group.id,
                                    cur.Page_Group.title,
                                    cur.Page_Group.icon,
                                    cur.Page_Role
                                );
                            return acc;
                        }
                        cur.Page_Role.forEach((role) => {
                            if (
                                !(
                                    acc[cur.Page_Group.title].data
                                        .roles as string[]
                                ).includes(role)
                            ) {
                                acc[cur.Page_Group.title].data.roles.push(role);
                                return acc;
                            }
                        });

                        return acc;
                    }, {});
                    const navigationGroups: any[] =
                        Object.values(collapsableRoutes);

                    dashUsers.forEach((rota) => {
                        const findFather = navigationGroups.findIndex(
                            (e) => e.title === rota.Page_Group.title
                        );
                        if (findFather >= 0) {
                            navigationGroups[findFather].children.push(
                                rota.type !== 'report-upload'
                                    ? CreateRoutes.BasicRoute(
                                          rota.Page_Role,
                                          rota.id,
                                          rota.title,
                                          rota.link
                                      )
                                    : CreateRoutes.ReportUploadRoute(
                                          rota.Page_Role,
                                          rota.id,
                                          rota.title,
                                          rota.link
                                      )
                            );
                            return navigationGroups;
                        }
                    });

                    routes.push(...navigationGroups);
                    return routes;
                });
            });
    }
}
