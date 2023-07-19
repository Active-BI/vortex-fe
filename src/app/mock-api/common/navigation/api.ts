import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import {
    defaultNavigation,
    defaultRoute,
} from 'app/mock-api/common/navigation/data';
import { AdminService } from '../../../modules/services/admin.service';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from 'app/modules/services/dashboard.service';
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
        private dashboardService: DashboardService
    ) {
        this._defaultNavigation = defaultRoute;
        this.dashboardService.getDashboardsByUser().subscribe((e: any[]) => {
            defaultRoute.push(
                ...defaultNavigation.filter((rota) =>
                    e.find((userDash) =>
                        rota.link
                            .toLowerCase()
                            .includes(
                                userDash.Tenant_DashBoard.Dashboard.type.toLowerCase()
                            )
                    )
                )
            );
            this._defaultNavigation = defaultRoute;
            this.registerHandlers();
        });
        // this.registerHandlers();
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
