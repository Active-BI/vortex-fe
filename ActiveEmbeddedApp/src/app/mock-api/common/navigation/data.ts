/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'inicio',
        title: 'Inicio',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : 'inicio'
    },
    {
        id   : 'gestao-vulnerabilidades',
        title: 'Gestão de Vulnerabilidades',
        type : 'basic',
        icon : 'heroicons_outline:pencil-alt',
        link : 'gestao-vulnerabilidades',
    },
    {
        id   : 'correlacionamento-logs',
        title: 'Correlacionmaneto de Logs',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : 'correlacionamento-logs'
    },
    {
        id   : 'deteccao-resposta',
        title: 'Detecção e Resposta aos EndPoints',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : 'deteccao-resposta'
    },
    {
        id   : 'mapeamento-dados',
        title: 'Mapeamentos de Dados Sensíveis',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : 'mapeamento-dados'
    },
    {
        id   : 'gestao-consentmento-cookies',
        title: 'Gestão de Consentimento de Cookies',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : 'gestao-consentmento-cookies'
    }
    ,
    {
        id   : 'prevencao-contra-vazamentos-dados',
        title: 'Prevenção Contra Vazamentos de Dados',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : 'prevencao-contra-vazamentos-dados'
    }

];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
