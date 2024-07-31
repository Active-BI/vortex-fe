/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { ReplaySubject } from 'rxjs';

export const defaultRoute: FuseNavigationItem[] = [
    {
        data: { roles: ['User', 'Admin', 'Master'] },
        id: 'inicio',
        title: 'Inicio',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: 'inicio',
    },
];
export const defaultNavigation: FuseNavigationItem[] = [];
@Injectable({
    providedIn: 'root',
})
export class MenuItemService {
    sub = new ReplaySubject();
    intervalId: any;
    constructor() {
    }
}
