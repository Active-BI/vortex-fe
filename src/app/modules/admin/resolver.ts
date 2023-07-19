import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { ClassyLayoutComponent } from 'app/layout/layouts/vertical/classy/classy.component';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
import jwtDecode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class NavigationResolver implements Resolve<any> {
    constructor(
        private navigationMockApi: NavigationMockApi,
        private navigationService: NavigationService
    ) {}

    resolve(): any {
        const token = localStorage.getItem('token');
        // this.navigationMockApi.registerHandlers();
        // this.classyLayoutComponent.ngOnInit();
        this.navigationMockApi.getRequestHandlers();
    }
}
