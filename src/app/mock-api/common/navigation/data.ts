/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';
// report/group
const data = {
    roles: ['Admin'],
};
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
        id: 'financeiro',
        title: 'Financeiro',
        type: 'collapsable',
        icon: 'mat_solid:attach_money',
        link: 'financeiro',
        data: { roles: ['Admin'] },
        children: [
            {
                data,
                id: 'P&L',
                title: 'P&L',
                type: 'basic',
                link: 'view/484c168a-0d65-42ed-9311-0d3eb0355996/8336cfba-32f1-40fc-a957-08c6b2f2a43f',
            },
            {
                data,
                id: 'P&L2',
                title: 'P&L 2',
                type: 'basic',
                link: 'view/ef31a339-7047-4630-90a4-3ed13e35a8da/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data,
                id: 'AtualxOutlook',
                title: 'Atual x Outlook',
                type: 'basic',
                link: 'view/c8b6e6fe-8904-42cb-a597-b4c6943f7ae7/8336cfba-32f1-40fc-a957-08c6b2f2a43f',
            },
            {
                data,
                id: 'ProdutosGEO',
                title: 'Produtos GEO',
                type: 'basic',
                link: 'view/fa5460f3-837f-4807-a7ea-2d27fe96d2a0/8336cfba-32f1-40fc-a957-08c6b2f2a43f',
            },
            {
                data,
                id: 'Produtos',
                title: 'Produtos',
                type: 'basic',
                link: 'view/5380345f-7128-40eb-9467-7ce7597d135f/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data,
                id: 'RealxOrçado',
                title: 'Real x Orçado',
                type: 'basic',
                link: 'view/d83edbb7-6994-4ea6-84bb-397f676ddd94/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data,
                id: 'Vendas',
                title: 'Vendas',
                type: 'basic',
                link: 'view/f7004150-ed6e-4e9c-854d-57907a03b225/63720031-826d-4f35-b533-e13be36e152c',
            },
        ],
    },
    {
        id: 'gente-e-gestao',
        title: 'Gente e Gestão',
        data,
        type: 'collapsable',
        icon: 'mat_outline:people_alt',
        children: [
            {
                data,
                id: 'indicadores',
                title: 'Indicadores',
                type: 'basic',
                link: 'view/4cfaaf2a-fee2-43ac-a756-9c038bee934e/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data,
                id: 'diversidade',
                title: 'Diversidade',
                type: 'basic',
                link: 'view/28c34e00-8391-4506-9d33-503d09bd21ea/63720031-826d-4f35-b533-e13be36e152c',
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
                id: 'Cronograma',
                data: { roles: ['User', 'Admin'] },

                title: 'Cronograma',
                type: 'basic',
                link: 'view/4a6f3b19-88c4-4547-802e-8964810cfa66/395a994f-9f0f-4a54-be92-2d3113e27e1c',
            },
            {
                data,
                id: 'Suporte',
                title: 'Suporte',
                type: 'basic',
                link: 'view/b88111ee-086c-474a-9114-e28e61e5b291/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data,
                id: 'FunilVendas',
                title: 'Funil de Vendas',
                type: 'basic',
                link: 'view/64026aef-cffa-4a80-8649-a9a9a9b0ac7c/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data,
                id: 'Projetos',
                title: 'Projetos',
                type: 'basic',
                link: 'view/ae93e5d8-57f3-41bd-baf1-80910227fe61/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data,
                id: 'Refinaria',
                title: 'Refinaria',
                type: 'basic',
                link: 'view/f07e55d2-83cf-4cc5-a91d-91a9ffa35732/63720031-826d-4f35-b533-e13be36e152c',
            },
            {
                data,
                id: 'Logistica',
                title: 'Logistica',
                type: 'basic',
                link: 'view/28348470-36ad-4d53-9344-11fe90718d3c/63720031-826d-4f35-b533-e13be36e152c',
            },
        ],
    },
    // {
    //     id: 'estrategico',
    //     title: 'Estratégico',
    //     type: 'collapsable',
    //     icon: 'mat_solid:psychology',
    //     children: [
    //         {
    //             id: 'dashboard-executivo',
    //             title: 'Dashboard Executivo',
    //             type: 'basic',
    //             link: 'dashboard/',
    //         },
    //         {
    //             id: 'okr',
    //             title: 'OKR',
    //             type: 'basic',
    //             link: 'okr/',
    //         },
    //         {
    //             id: 'projetos-estrategicos',
    //             title: 'Projetos Estratégicos',
    //             type: 'basic',
    //             link: 'projetos/',
    //         },
    //     ],
    // },
    // {
    //     id: 'ti',
    //     title: 'TI',
    //     type: 'collapsable',
    //     icon: 'mat_outline:computer',
    //     children: [
    //         {
    //             id: 'monitoramento-de-ativos',
    //             title: 'Monitoramento de Ativos',
    //             type: 'basic',
    //             link: 'view/7b71c89f-1d23-4d57-a99c-369f0ae8b5d1/c807ca26-3f93-463d-aa15-9a12e48174ba',
    //         },
    //         {
    //             id: 'controle-de-antivirus',
    //             title: 'Controle de Antivirus',
    //             type: 'basic',
    //             link: 'controle/',
    //         },
    //         {
    //             id: 'chamados',
    //             title: 'Chamados',
    //             type: 'basic',
    //             link: 'chamados/',
    //         },
    //     ],
    // },
    // {
    //     id: 'juridico',
    //     title: 'Jurídico',
    //     type: 'collapsable',
    //     icon: 'mat_outline:gavel',
    //     children: [
    //         {
    //             id: 'provisoes',
    //             title: 'Provisões',
    //             type: 'basic',
    //             link: 'provisoes/',
    //         },
    //         {
    //             id: 'custos-de-processos',
    //             title: 'Custos de Processos',
    //             type: 'basic',
    //             link: 'custos/',
    //         },
    //         {
    //             id: 'acoes-trabalhistas',
    //             title: 'Ações Trabalhistas',
    //             type: 'basic',
    //             link: 'acoes/',
    //         },
    //     ],
    // },
    // {
    //     id: 'monitoramento-do-bi',
    //     title: 'Monitoramento do BI',
    //     type: 'collapsable',
    //     icon: 'mat_outline:query_stats',
    //     children: [
    //         {
    //             id: 'atualizacoes',
    //             title: 'Atualizações',
    //             type: 'basic',
    //             link: 'atualizacoes/',
    //         },
    //         {
    //             id: 'acessos',
    //             title: 'Acessos',
    //             type: 'basic',
    //             link: 'acessos/',
    //         },
    //         {
    //             id: 'logs',
    //             title: 'Logs',
    //             type: 'basic',
    //             link: 'logs/',
    //         },
    //     ],
    // },
    {
        data,

        id: 'usuarios.lista',
        title: 'Gestão de Usuários',
        type: 'basic',
        icon: 'mat_solid:person_search',
        link: 'usuarios',
    },
];
