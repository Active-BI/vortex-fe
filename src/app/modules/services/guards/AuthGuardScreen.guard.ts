import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Route,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MenuItemService } from 'app/mock-api/common/navigation/data';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardScreen implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private menuItemService: MenuItemService
    ) {}
    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean | UrlTree> {
        if (localStorage.getItem('token')) {
            const token = JSON.parse(localStorage.getItem('token'));
            const user: any = decode(token);
            if (
                route.data['expectedRoles'] === null ||
                route.data['expectedRoles'].length === 0 ||
                route.data['expectedRoles'].includes(user.role_name)
            ) {
                return true;
            }
            return false;
        } else {
            localStorage.clear()
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
