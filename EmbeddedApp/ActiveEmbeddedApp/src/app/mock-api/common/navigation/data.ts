/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'inicio',
        title: 'Inicio',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: 'inicio'
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
                link: 'view/7b71c89f-1d23-4d57-a99c-369f0ae8b5d1/c807ca26-3f93-463d-aa15-9a12e48174ba',
            },
            {
                id: 'realizado-vs-orcado',
                title: 'Realizado vs Orçado',
                type: 'basic',
                link: 'view/15d9dd35-357b-4c7d-acbd-1544ecfac4dd/c807ca26-3f93-463d-aa15-9a12e48174ba',
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
        ]
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
                link: 'view/',
            },
            {
                id: 'diversidade',
                title: 'Diversidade',
                type: 'basic',
                link: 'view/',
            },
            {
                id: 'peolple-analytics',
                title: 'Peolple Analytics',
                type: 'basic',
                link: 'view/',
            },
            {
                id: 'fopag',
                title: 'Fopag',
                type: 'basic',
                link: 'view/',
            },
        ]
    },
    {
        id: 'operacao',
        title: 'Operação',
        type: 'collapsable',
        icon: 'mat_solid:account_tree',
        children: [
            {
                id: 'gestao-de-projetos',
                title: 'Gestão de Projetos',
                type: 'basic',
                link: 'view/',
            },
            {
                id: 'informacoes-operacionais',
                title: 'Informações Operacionais',
                type: 'basic',
                link: 'view/',
            },
            {
                id: 'monitoramento-de-frota',
                title: 'Monitoramento de Frota',
                type: 'basic',
                link: 'view/',
            },
            {
                id: 'analise-de-clientes',
                title: 'Analise De Clientes',
                type: 'basic',
                link: 'view/',
            },
            {
                id: 'indicadores-de-performance',
                title: 'Indicadores de Performance',
                type: 'basic',
                link: 'view/',
            },
        ]
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
                link: 'view/',
            },
            {
                id: 'okr',
                title: 'OKR',
                type: 'basic',
                link: 'view/',
            },
            {
                id: 'projetos-estrategicos',
                title: 'Projetos Estratégicos',
                type: 'basic',
                link: 'view/',
            }
        ]
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
                link: 'view/',
            },
            {
                id: 'controle-de-antivirus',
                title: 'Controle de Antivirus',
                type: 'basic',
                link: 'view/',
            },
            {
                id: 'chamados',
                title: 'Chamados',
                type: 'basic',
                link: 'view/',
            }
        ]
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
                link: 'view/',
            },
            {
                id: 'custos-de-processos',
                title: 'Custos de Processos',
                type: 'basic',
                link: 'view/',
            },
            {
                id: 'acoes-trabalhistas',
                title: 'Ações Trabalhistas',
                type: 'basic',
                link: 'view/',
            }
        ]
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
                link: 'view/',
            },
            {
                id: 'acessos',
                title: 'Acessos',
                type: 'basic',
                link: 'view/',
            },
            {
                id: 'logs',
                title: 'Logs',
                type: 'basic',
                link: 'view/',
            }
        ]
    },
    {
        id: 'usuarios.lista',
        title: 'Gestão de Usuários',
        type: 'basic',
        icon: 'mat_solid:person_search',
        link: 'usuarios'
    }
];