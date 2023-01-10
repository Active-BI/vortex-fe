import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { defaultNavigation } from 'app/mock-api/common/navigation/data';
import { AdminService } from '../../../modules/services/admin.service'
@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi
{
    private _defaultNavigation: FuseNavigationItem[] = defaultNavigation
    
    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService, private adminService: AdminService )
    {
        // Register Mock API handlers
        this.registerHandlers()
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply(() => {

                return [
                    200,
                    {
                        default   : cloneDeep(this._defaultNavigation),
                    }
                ];
            });
    }
}
