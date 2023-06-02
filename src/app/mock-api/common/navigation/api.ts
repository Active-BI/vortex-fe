import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import {
    ModuleRoutes,
    defaultNavigation,
} from 'app/mock-api/common/navigation/data';
import { AdminService } from '../../../modules/services/admin.service';
import { MenuService } from 'app/modules/services/menu.service';
@Injectable({
    providedIn: 'root',
})
export class NavigationMockApi {
    private _defaultNavigation: FuseNavigationItem[];

    /**
     * Constructor
     */
    constructor(
        private _fuseMockApiService: FuseMockApiService,
        private menuService: MenuService
    ) {
        // Register Mock API handlers
        new ModuleRoutes().getRoutes().then((res) => {
            this._defaultNavigation = res;
        });
        this.menuService.getMenus().subscribe((res: FuseNavigationItem[]) => {
            res = res.map((r) => ({
                ...r,
                link: 'view-report/' + r.report_id + '/' + r.group_id,
                type: 'basic',
                data: { roles: ['User', 'Admin', 'Regional', 'Nacional'] },
            }));
            this._defaultNavigation.push(...res);
        });
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
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
