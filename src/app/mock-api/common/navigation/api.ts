import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { MenuItemService } from 'app/mock-api/common/navigation/data';
@Injectable({
    providedIn: 'root',
})
export class NavigationMockApi {
    private _defaultNavigation: FuseNavigationItem[];

    constructor(
        private _fuseMockApiService: FuseMockApiService,
        private menuItemService: MenuItemService
    ) {
        Promise.all([JSON.parse(localStorage.getItem('userRoutes'))]).then(
            (e) => {
                this._defaultNavigation = e[0];
                this.registerHandlers();
            }
        );
    }

    registerHandlers(): void {
        this._fuseMockApiService.onGet('api/common/navigation').reply(() => {
            return [
                200,
                {
                    default: cloneDeep(this._defaultNavigation),
                },
            ];
        });
    }
}
