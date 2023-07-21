/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { DashboardService } from 'app/modules/services/dashboard.service';
import jwtDecode from 'jwt-decode';
import { ReplaySubject } from 'rxjs';
// report/group
const dataAdmin = {
    roles: ['Admin'],
};

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
export const defaultNavigation: FuseNavigationItem[] = [
    {
        data: { roles: ['User', 'Admin'] },
        id: 'rh-uncionarios',
        title: 'Funcionarios',
        icon: 'heroicons_outline:shield-check',
        type: 'basic',
        link: 'view-report-type/RH_FUNCIONARIOS',
    },
    {
        data: { roles: ['User', 'Admin'] },
        id: 'gv',
        title: 'GV',
        icon: 'heroicons_outline:shield-check',
        type: 'basic',
        link: 'view-report-type/GV',
    },
    {
        data: dataAdmin,
        id: 'usuarios.lista',
        title: 'Gestão de Usuários',
        type: 'basic',
        icon: 'mat_solid:person_search',
        link: 'usuarios',
    },
];
@Injectable({
    providedIn: 'root',
})
export class MenuItemService {
    sub = new ReplaySubject();
    intervalId: any;
    constructor() {
        this.getNewRoutes();
    }
    getNewRoutes() {
        return Promise.all([localStorage.getItem('token')]).then((e) => {
            if (e[0]) {
                const decoded = jwtDecode(JSON.parse(e[0])) as any;
                const dashUsers = decoded.dashboardUser;
                const routes: FuseNavigationItem[] = [];
                routes.push(...defaultRoute);
                routes.push(
                    ...defaultNavigation.filter((rota) =>
                        dashUsers.find((userDash) =>
                            rota.link
                                .toLowerCase()
                                .includes(
                                    userDash.Tenant_DashBoard.Dashboard.type.toLowerCase()
                                )
                        )
                    )
                );
                console.log(decoded.role_name);
                if (decoded.role_name === 'Master') {
                    routes.push({
                        data: { roles: ['Master'] },
                        id: 'gestao',
                        title: 'Gestão',
                        type: 'collapsable',
                        icon: 'mat_solid:settings',
                        children: [
                            {
                                data: { roles: ['Master'] },
                                link: 'gestao/tenants',
                                id: 'gestao-tenant',
                                title: 'Permissão de Clientes',
                                type: 'basic',
                            },
                        ],
                    });
                }
                return routes;
            }
        });
    }
}
