/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';
// report/group
const dataAdmin = {
    roles: ['Admin'],
};

export class ModuleRoutes {
    constructor() {}

    getRoutes() {
        const p = Promise.resolve(this.getRoutesAsync());
        return p;
    }

    async getRoutesAsync() {
        return await defaultNavigation;
    }
}

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
