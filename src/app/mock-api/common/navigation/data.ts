/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';
// report/group
const dataAdmin = {
    roles: ['User', 'Admin', 'Regional', 'Nacional'],
};
const dataUser = {
    roles: ['User', 'Admin', 'Regional', 'Nacional'],
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
        data: { roles: ['User', 'Admin', 'Regional', 'Nacional'] },
        id: 'inicio',
        title: 'Inicio',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: 'inicio',
    },

    {
        data: { roles: ['User', 'Admin', 'Regional', 'Nacional'] },
        id: 'gestao-vuln',
        title: 'Gestão de vulnerabilidades',
        icon: 'heroicons_outline:shield-check',
        type: 'basic',
        link: 'view-report/7b71c89f-1d23-4d57-a99c-369f0ae8b5d1/c807ca26-3f93-463d-aa15-9a12e48174ba',
    },
    {
        data: { roles: ['User', 'Admin', 'Regional', 'Nacional'] },
        id: 'gestao-vuln',
        title: 'Gestão de vulnerabilidades - POR TIPO',
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
