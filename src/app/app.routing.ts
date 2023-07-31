import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { NoAuthGuard } from './modules/services/guards/noAuthGuard.guard';
import { AuthGuard } from './modules/services/guards/AuthGuard.guard';
import { SendPassRecoverComponent } from './modules/auth/reset-send/send-pass-recover.component';
import { ResetPassComponent } from './modules/auth/reset-pass/reset-pass.component';
import { HomeComponent } from './modules/home/home.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    {
        path: 'home',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
            expectedRoles: [],
        },
        children: [
            {
                path: '',
                component: HomeComponent,
            },
        ],
    },
    {
        path: 'auth',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
            expectedRoles: [],
        },
        children: [
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
            {
                path: 'reset-send',
                component: SendPassRecoverComponent,
            },
            {
                path: 'reset-pass/:token',
                component: ResetPassComponent,
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: 'auth',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
            expectedRoles: [],
        },
        children: [
            {
                path: 'sign-out',
                data: {
                    layout: 'empty',
                    expectedRoles: [],
                },
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
        ],
    },

    // Admin routes
    {
        path: 'app',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            expectedRoles: ['Admin', 'User', 'Master'],
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('app/modules/admin/admin.module').then(
                        (m) => m.AdminModule
                    ),
            },
        ],
    },
    {
        path: 'master',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            expectedRoles: ['Master'],
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('app/modules/master/master.module').then(
                        (m) => m.MasterModule
                    ),
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'app/inicio',
    },
];
