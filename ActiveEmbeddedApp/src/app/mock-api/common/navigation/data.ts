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
        icon : 'mat_solid:policy',
        link : 'gestao-vulnerabilidades',
    },
    {
        id   : 'correlacionamento-logs',
        title: 'Correlacionmaneto de Logs',
        type : 'basic',
        icon : 'mat_solid:announcement',
        link : 'correlacionamento-logs'
    },
    {
        id   : 'deteccao-resposta',
        title: 'Detecção e Resposta aos EndPoints',
        type : 'basic',
        icon : 'mat_solid:important_devices',
        link : 'deteccao-resposta'
    },
    {
        id   : 'mapeamento-dados',
        title: 'Mapeamentos de Dados Sensíveis',
        type : 'basic',
        icon : 'mat_solid:privacy_tip',
        link : 'mapeamento-dados'
    },
    {
        id   : 'gestao-consentmento-cookies',
        title: 'Gestão de Consentimento de Cookies',
        type : 'basic',
        icon : 'mat_solid:perm_device_information',
        link : 'gestao-consentmento-cookies'
    }
    ,
    {
        id   : 'prevencao-contra-vazamentos-dados',
        title: 'Prevenção Contra Vazamentos de Dados',
        type : 'basic',
        icon : 'mat_solid:security',
        link : 'prevencao-contra-vazamentos-dados'
    },
    {
            id   : 'usuarios.lista',
            title: 'Gestão de Usuários',
            type : 'basic',
            icon : 'mat_solid:person_search',
            link: 'usuarios'
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
