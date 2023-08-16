import { Route } from '@angular/router';
import { AuthSignUpComponent } from 'app/modules/auth/sign-up/sign-up.component';
import { AuthRequestAccessComponent } from './request-access.component';

export const authRequestRoutes: Route[] = [
    {
        path: '',
        component: AuthRequestAccessComponent,
    },
];
