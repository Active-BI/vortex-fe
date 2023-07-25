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
        id: 'RH_FUNCIONARIOS',
        title: 'Funcionarios',
        icon: 'heroicons_outline:shield-check',
        type: 'basic',
        link: 'view-report-type/RH_FUNCIONARIOS',
    },
    {
        data: { roles: ['User', 'Admin'] },
        id: 'GV',
        title: 'GV',
        icon: 'heroicons_outline:shield-check',
        type: 'basic',
        link: 'view-report-type/GV',
    },
    {
        data: dataAdmin,
        id: 'USUARIOS',
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
                if (decoded.role_name === 'Master') {
                    routes.push({
                        data: { roles: ['Master'] },
                        id: 'GESTAO',
                        title: 'Gestão',
                        type: 'collapsable',
                        icon: 'mat_solid:settings',
                        children: [
                            {
                                data: { roles: ['Master'] },
                                link: '/master/gestao/tenants',
                                id: 'GESTAO_TENANT',
                                title: 'Gestão de ambientes',
                                type: 'basic',
                            },
                            {
                                data: { roles: ['Master'] },
                                link: '/master/gestao/solicitacoes-de-cadastro',
                                id: 'SOLICITACOES_CADASTRO',
                                title: 'Solicitações de acesso',
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
