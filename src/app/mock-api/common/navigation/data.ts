/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';
import { DashboardService } from 'app/modules/services/dashboard.service';
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
    {
        data: dataAdmin,
        id: 'usuarios.lista',
        title: 'Gestão de Usuários',
        type: 'basic',
        icon: 'mat_solid:person_search',
        link: 'usuarios',
    },
    // {
    //     data: { roles: ['Master'] },
    //     id: 'controles',
    //     title: 'Controles',
    //     type: 'basic',
    //     icon: 'heroicons_outline:home',
    //     link: 'controles',
    // },
];
export const defaultNavigation: FuseNavigationItem[] = [
    {
        data: { roles: ['User', 'Admin'] },
        id: 'inicio',
        title: 'Inicio',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: 'inicio',
    },

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
