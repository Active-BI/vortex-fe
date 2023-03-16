import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        if (localStorage.getItem('token')) {
            const token = JSON.parse(localStorage.getItem('token'));
            const user: any = decode(token);

            if (
                route.data['expectedRoles'] === null ||
                route.data['expectedRoles'].length === 0 ||
                route.data['expectedRoles'].includes(user.role)
            )
                return true;
            return false;
        } else {
            localStorage.removeItem('token');
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
