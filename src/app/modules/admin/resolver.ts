import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';

@Injectable({ providedIn: 'root' })
export class NavigationResolver implements Resolve<any> {
    constructor(
        private navigationMockApi: NavigationMockApi,
        private navigationService: NavigationService
    ) {}

    resolve(): any {
        // const token = localStorage.getItem('token');
        // this.navigationMockApi.getRequestHandlers();
    }
}
