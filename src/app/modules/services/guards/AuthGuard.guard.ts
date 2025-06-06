import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router) {}
    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean | UrlTree> {
        if (localStorage.getItem('token')) {
            const token = JSON.parse(localStorage.getItem('token'));
            try {
                await jwtDecode(token, {
                    header: true,
                });

                const user: any = await jwtDecode(token);
                
                if (route.data['expectedRoles'].includes(user.role_name) === false) {
                    user.role_name === 'Master' ?  this.router.navigate(['/master/inicio']) : this.router.navigate(['/app/inicio'])
                    return false;
                }

                // TODO - serviço pra identificar o usuário
                // TODO - as rotas do usuário
                // TODO - redirecionar pra primeira rota

                if (
                    route.data['expectedRoles'] === null ||
                    route.data['expectedRoles'].length === 0 ||
                    route.data['expectedRoles'].includes(user.role_name)
                ) {
                    return true;
                }
                return false;
            } catch (e) {
                localStorage.clear();
                this.router.navigate(['/auth/sign-in']);
                return false;
            }
        } else {
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
            return false;
        }
    }
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(next, state);
    }
}
