import { Route } from '@angular/router';
// import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';

export const authSignInRoutes: Route[] = [
    {
        path     : '',
        data: {
        expectedRoles: ['User','ADMIN']
        },
        component: AuthSignInComponent
    }
];
