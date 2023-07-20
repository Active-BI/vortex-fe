import {
    EventEmitter,
    Injectable,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import {
    MenuItemService,
    defaultNavigation,
    defaultRoute,
} from 'app/mock-api/common/navigation/data';
import { AdminService } from '../../../modules/services/admin.service';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from 'app/modules/services/dashboard.service';
import { Route, Router } from '@angular/router';
@Injectable({
    providedIn: 'root',
})
export class NavigationMockApi {
    private _defaultNavigation: FuseNavigationItem[];

    constructor(
        private _fuseMockApiService: FuseMockApiService,
        private menuItemService: MenuItemService
    ) {
        Promise.all([this.menuItemService.getNewRoutes()]).then((e) => {
            this._defaultNavigation = e[0];
            this.registerHandlers();
        });
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
