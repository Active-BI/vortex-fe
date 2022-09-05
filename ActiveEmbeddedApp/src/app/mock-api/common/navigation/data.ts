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
        id   : 'item1',
        title: 'Item 1',
        type : 'basic',
        icon : 'heroicons_outline:pencil-alt',
        link : '',
    },
    {
        id   : 'item2',
        title: 'Item 2',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : '/home'
    },
    {
        id   : 'item3',
        title: 'Item 3',
        type : 'collapsable',
        icon : 'heroicons_outline:calculator',
        link : '/home',
        children: [
            {
                id: 'item3.1',
                title: 'Item 3.1',
                type: 'basic',
                icon: 'heroicons_outline:library',
                link: '/home2',
            },
            {
                id: 'item3.2',
                title: 'Item 3.2',
                type: 'basic',
                icon: 'heroicons_outline:tag',
                link: '/home3',
            },
    ]
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
