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
export class NavigationMockApi implements OnChanges {
    private _defaultNavigation: FuseNavigationItem[];
    @Input() dashUsers = [];
    @Output() minhaPropriedadeAtualizada: EventEmitter<string> =
        new EventEmitter<string>();

    constructor(
        private _fuseMockApiService: FuseMockApiService,
        private dashboardService: DashboardService
    ) {
        this._defaultNavigation = defaultRoute;
        this.registerHandlers();

        const token = localStorage.getItem('token');
        if (token !== null) {
            this.getRequestHandlers();
            console.log('changes.dashUsers', 'token');
        } else {
            setTimeout(() => {
                console.log('this.getRequestHandlers(); AFTER ! SEC');
                this.getRequestHandlers();

                // if (token !== null)
            }, 5000);
        }
    }
    ngOnChanges(changes: SimpleChanges): void {}
    async getRequestHandlers() {
        this.dashboardService.getDashboardsByUser().subscribe((e: any[]) => {
            this.dashUsers = e;
            defaultRoute.push(
                ...defaultNavigation.filter((rota) =>
                    this.dashUsers.find((userDash) =>
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
