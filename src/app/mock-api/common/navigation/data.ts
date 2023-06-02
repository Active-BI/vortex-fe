/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';
// report/group
const dataAdmin = {
    roles: ['Admin'],
};
const dataUser = {
    roles: ['User', 'Admin'],
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

        id: 'menus',
        title: 'Menus de Acesso',
        type: 'basic',
        icon: 'mat_solid:person_search',
        link: 'menus',
    },
    {
        data: { roles: ['User', 'Admin', 'Regional', 'Nacional'] },
        id: 'indicadores-segurança',
        title: 'Indicadores de Segurança',
        type: 'collapsable',
        icon: 'heroicons_outline:shield-check',
        children: [
            {
                data: { roles: ['User', 'Admin', 'Regional', 'Nacional'] },
                id: 'gestao-vuln',
                title: 'Gestão de vulnerabilidades',
                type: 'basic',
                link: 'view-report/7b71c89f-1d23-4d57-a99c-369f0ae8b5d1/c807ca26-3f93-463d-aa15-9a12e48174ba',
            },
            {
                data: { roles: ['User', 'Admin', 'Regional', 'Nacional'] },
                id: 'correlacionamento-log',
                title: 'Correlacionamento de Logs',
                type: 'basic',
                link: 'view-report/b715e54d-1715-425e-9cb3-5d0fb1b0447d/c807ca26-3f93-463d-aa15-9a12e48174ba',
            },
            // {
            //     data: dataAdmin,
            //     id: 'detaccao-res-end',
            //     title: 'Detecção e Resposta de Endpoins',
            //     type: 'basic',
            //     link: 'view-report/b976fd95-a9b5-4ad5-a2af-1df6adccfef0/c807ca26-3f93-463d-aa15-9a12e48174ba',
            // },
            {
                data: dataAdmin,
                id: 'resp-incidentes',
                title: 'Resposta as Incidentes',
                type: 'basic',
                link: 'view-report/4ea21399-b6f6-467e-a769-935b02bcd61a/c807ca26-3f93-463d-aa15-9a12e48174ba',
            },
            {
                data: dataAdmin,
                id: 'op-reqs',
                title: 'Operações e requisições',
                type: 'basic',
                link: 'view-report/1a7880e4-61e8-4c88-a13c-35f917323f69/c807ca26-3f93-463d-aa15-9a12e48174ba',
            },
            {
                data: dataAdmin,
                id: 'map-dados',
                title: 'Mapeamento de dados',
                type: 'basic',
                link: 'view-report/79013f39-27af-4139-a2c2-b72c3bcfa0e7/c807ca26-3f93-463d-aa15-9a12e48174ba',
            },
            {
                data: dataAdmin,
                id: 'cons-cookie',
                title: 'Gestão de Consentimento de Cookies',
                type: 'basic',
                link: 'view-report/15d9dd35-357b-4c7d-acbd-1544ecfac4dd/c807ca26-3f93-463d-aa15-9a12e48174ba',
            },
            {
                data: dataAdmin,
                id: 'prev-vaz-dados',
                title: 'Prevenção Contra Vazamento de Dados',
                type: 'basic',
                link: 'view-report/bb27db32-2beb-4a64-9271-02ffdfc3bce9/c807ca26-3f93-463d-aa15-9a12e48174ba',
            },
            {
                data: dataAdmin,
                id: 'dist-app-web',
                title: 'Distribuição de Aplicações Web',
                type: 'basic',
                link: 'view-report/a18b4f89-0169-408a-bdd0-766291f45cf5/c807ca26-3f93-463d-aa15-9a12e48174ba',
            },
        ],
    },

    {
        id: 'financeiro',
        title: 'Financeiro',
        type: 'collapsable',
        icon: 'mat_solid:attach_money',
        link: 'financeiro',
        data: { roles: ['Admin'] },
        children: [
            {
                data: dataAdmin,
                id: 'P&L',
                title: 'P&L',
                type: 'basic',
                link: 'view-report/484c168a-0d65-42ed-9311-0d3eb0355996/8336cfba-32f1-40fc-a957-08c6b2f2a43f',
            },
            {
                data: dataAdmin,
                id: 'P&L2',
                title: 'P&L 2',
                type: 'basic',
                link: 'view-report/ef31a339-7047-4630-90a4-3ed13e35a8da/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data: dataAdmin,
                id: 'AtualxOutlook',
                title: 'Atual x Outlook',
                type: 'basic',
                link: 'view-report/c8b6e6fe-8904-42cb-a597-b4c6943f7ae7/8336cfba-32f1-40fc-a957-08c6b2f2a43f',
            },
            {
                data: dataAdmin,
                id: 'ProdutosGEO',
                title: 'Produtos GEO',
                type: 'basic',
                link: 'view-report/fa5460f3-837f-4807-a7ea-2d27fe96d2a0/8336cfba-32f1-40fc-a957-08c6b2f2a43f',
            },
            // {
            //     data: dataAdmin,
            //     id: 'Produtos',
            //     title: 'Produtos',
            //     type: 'basic',
            //     link: 'view-report/5380345f-7128-40eb-9467-7ce7597d135f/63720031-826d-4f35-b533-e13be36e152c',
            // },
            {
                data: dataAdmin,
                id: 'RealxOrçado',
                title: 'Real x Orçado',
                type: 'basic',
                link: 'view-report/d83edbb7-6994-4ea6-84bb-397f676ddd94/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data: dataAdmin,
                id: 'Vendas',
                title: 'Vendas',
                type: 'basic',
                link: 'view-report/f7004150-ed6e-4e9c-854d-57907a03b225/63720031-826d-4f35-b533-e13be36e152c',
            },
        ],
    },
    {
        id: 'gente-e-gestao',
        title: 'Gente e Gestão',
        data: dataUser,
        type: 'collapsable',
        icon: 'mat_outline:people_alt',
        children: [
            {
                data: dataUser,
                id: 'indicadores',
                title: 'Indicadores',
                type: 'basic',
                link: 'view-report/4cfaaf2a-fee2-43ac-a756-9c038bee934e/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data: dataUser,
                id: 'diversidade',
                title: 'Diversidade',
                type: 'basic',
                link: 'view-report/28c34e00-8391-4506-9d33-503d09bd21ea/63720031-826d-4f35-b533-e13be36e152c',
            },
        ],
    },
    {
        id: 'operacao',
        title: 'Operação',
        type: 'collapsable',
        icon: 'mat_solid:account_tree',
        data: { roles: ['Admin', 'User'] },
        children: [
            {
                id: 'monitoramento',
                data: { roles: ['User', 'Admin'] },

                title: 'Monitoramento',
                type: 'basic',
                link: 'view-report/4a6f3b19-88c4-4547-802e-8964810cfa66/395a994f-9f0f-4a54-be92-2d3113e27e1c',
            },
            {
                id: 'governanca',
                data: { roles: ['User', 'Admin'] },
                title: 'Governança Power Bi',
                type: 'basic',
                link: 'view-report/a3dd2a2b-fa20-4db3-aa78-301832fc6eff/c807ca26-3f93-463d-aa15-9a12e48174ba',
            },
            {
                data: dataAdmin,
                id: 'Suporte',
                title: 'Suporte',
                type: 'basic',
                link: 'view-report/b88111ee-086c-474a-9114-e28e61e5b291/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data: dataAdmin,
                id: 'FunilVendas',
                title: 'Funil de Vendas',
                type: 'basic',
                link: 'view-report/64026aef-cffa-4a80-8649-a9a9a9b0ac7c/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data: dataAdmin,
                id: 'Projetos',
                title: 'Projetos',
                type: 'basic',
                link: 'view-report/ae93e5d8-57f3-41bd-baf1-80910227fe61/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data: dataAdmin,
                id: 'Refinaria',
                title: 'Refinaria',
                type: 'basic',
                link: 'view-report/f07e55d2-83cf-4cc5-a91d-91a9ffa35732/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data: dataAdmin,
                id: 'Logistica',
                title: 'Logistica',
                type: 'basic',
                link: 'view-report/28348470-36ad-4d53-9344-11fe90718d3c/63720031-826d-4f35-b533-e13be36e152c',
            },
        ],
    },
    // {
    //     id: 'realtime',
    //     title: 'Real Time',
    //     type: 'collapsable',
    //     icon: 'mat_solid:bolt',
    //     link: 'realtime',
    //     data: { roles: ['Admin'] },
    //     children: [
    //         {
    //             data,
    //             id: 'monitordeativo',
    //             title: 'Monitor de Ativos',
    //             type: 'basic',
    //             link: 'view-dashboard/b8cbe4dd-2ce2-483d-89d0-3b1c4929f5a9/8336cfba-32f1-40fc-a957-08c6b2f2a43f',
    //         },
    //     ],
    // },
    {
        data: dataAdmin,

        id: 'usuarios.lista',
        title: 'Gestão de Usuários',
        type: 'basic',
        icon: 'mat_solid:person_search',
        link: 'usuarios',
    },
];
