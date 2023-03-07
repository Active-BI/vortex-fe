/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
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
        children: [
            {
                id: 'painel-de-Vendas',
                title: 'Painel de Vendas',
                type: 'basic',
                link: 'painel-de-Vendas/',
            },
            {
                id: 'realizado-vs-orcado',
                title: 'Realizado vs Orçado',
                type: 'basic',
                link: 'view/c8b6e6fe-8904-42cb-a597-b4c6943f7ae7/8336cfba-32f1-40fc-a957-08c6b2f2a43f',
            },
            {
                id: 'fechamento-financeiro',
                title: 'Fechamento Financeiro',
                type: 'basic',
                link: 'fechamento-financeiro',
            },
            {
                id: 'financeiro-P&L-Budget',
                title: 'Financeiro P&L - Budget',
                type: 'basic',
                link: 'financeiro-P&L-Budget',
            },
            {
                id: 'P&L',
                title: 'P&L',
                type: 'basic',
                link: 'P&L',
            },
            {
                id: 'DRE',
                title: 'DRE',
                type: 'basic',
                link: 'DRE',
            },
            {
                id: 'analise-faturamento',
                title: 'Analise Faturamento',
                type: 'basic',
                link: 'analise-faturamento',
            },
        ],
    },
    {
        id: 'gente-e-gestao',
        title: 'Gente e Gestão',
        type: 'collapsable',
        icon: 'mat_outline:people_alt',
        children: [
            {
                id: 'indicadores-rh',
                title: 'Indicadores RH',
                type: 'basic',
                link: 'indicadores/',
            },
            {
                id: 'diversidade',
                title: 'Diversidade',
                type: 'basic',
                link: 'diversidade/',
            },
            {
                id: 'peolple-analytics',
                title: 'Peolple Analytics',
                type: 'basic',
                link: 'peolple/',
            },
            {
                id: 'fopag',
                title: 'Fopag',
                type: 'basic',
                link: 'fopag/',
            },
        ],
    },
    {
        id: 'operacao',
        title: 'Operação',
        type: 'collapsable',
        icon: 'mat_solid:account_tree',
        children: [
            {
                id: 'monitoramento-horas',
                title: 'Monitoramento Horas',
                type: 'basic',
                link: 'view/a2ade005-2751-4427-b1a5-4345005ba6e2/4aebafbd-5555-4f41-8ad8-3c95ae749c1b',
            },
            {
                id: 'gestao-de-projetos',
                title: 'Gestão de Projetos',
                type: 'basic',
                link: 'gestao/',
            },
            {
                id: 'informacoes-operacionais',
                title: 'Informações Operacionais',
                type: 'basic',
                link: 'informacoes/',
            },
            {
                id: 'monitoramento-de-frota',
                title: 'Monitoramento de Frota',
                type: 'basic',
                link: 'monitoramento/',
            },
            {
                id: 'analise-de-clientes',
                title: 'Analise De Clientes',
                type: 'basic',
                link: 'analise/',
            },
            {
                id: 'indicadores-de-performance',
                title: 'Indicadores de Performance',
                type: 'basic',
                link: 'indicadores/',
            },
        ],
    },
    {
        id: 'estrategico',
        title: 'Estratégico',
        type: 'collapsable',
        icon: 'mat_solid:psychology',
        children: [
            {
                id: 'dashboard-executivo',
                title: 'Dashboard Executivo',
                type: 'basic',
                link: 'dashboard/',
            },
            {
                id: 'okr',
                title: 'OKR',
                type: 'basic',
                link: 'okr/',
            },
            {
                id: 'projetos-estrategicos',
                title: 'Projetos Estratégicos',
                type: 'basic',
                link: 'projetos/',
            },
        ],
    },
    {
        id: 'ti',
        title: 'TI',
        type: 'collapsable',
        icon: 'mat_outline:computer',
        children: [
            {
                id: 'monitoramento-de-ativos',
                title: 'Monitoramento de Ativos',
                type: 'basic',
                link: 'view/7b71c89f-1d23-4d57-a99c-369f0ae8b5d1/c807ca26-3f93-463d-aa15-9a12e48174ba',
            },
            {
                id: 'controle-de-antivirus',
                title: 'Controle de Antivirus',
                type: 'basic',
                link: 'controle/',
            },
            {
                id: 'chamados',
                title: 'Chamados',
                type: 'basic',
                link: 'chamados/',
            },
        ],
    },
    {
        id: 'juridico',
        title: 'Jurídico',
        type: 'collapsable',
        icon: 'mat_outline:gavel',
        children: [
            {
                id: 'provisoes',
                title: 'Provisões',
                type: 'basic',
                link: 'provisoes/',
            },
            {
                id: 'custos-de-processos',
                title: 'Custos de Processos',
                type: 'basic',
                link: 'custos/',
            },
            {
                id: 'acoes-trabalhistas',
                title: 'Ações Trabalhistas',
                type: 'basic',
                link: 'acoes/',
            },
        ],
    },
    {
        id: 'monitoramento-do-bi',
        title: 'Monitoramento do BI',
        type: 'collapsable',
        icon: 'mat_outline:query_stats',
        children: [
            {
                id: 'atualizacoes',
                title: 'Atualizações',
                type: 'basic',
                link: 'atualizacoes/',
            },
            {
                id: 'acessos',
                title: 'Acessos',
                type: 'basic',
                link: 'acessos/',
            },
            {
                id: 'logs',
                title: 'Logs',
                type: 'basic',
                link: 'logs/',
            },
        ],
    },
    {
        id: 'usuarios.lista',
        title: 'Gestão de Usuários',
        type: 'basic',
        icon: 'mat_solid:person_search',
        link: 'usuarios',
    },
];
