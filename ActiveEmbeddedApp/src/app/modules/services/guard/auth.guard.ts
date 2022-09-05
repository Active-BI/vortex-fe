import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRoles = route.data['expectedRole'];
    const token = localStorage.getItem('token') as string;
    const decodedToken = jwtDecode(token) as any;
    const roles =  decodedToken.role;
    if (this.authService.isLoggedIn() && ((expectedRoles.some((r: any) => roles.map((x: any) => x.toUpperCase()).includes(r.toUpperCase()))) || expectedRoles === undefined)) {
      return true;
    } else {
      // this.toastr.warning('Usuário não possui acesso', null, {
      //   timeOut: 2000,
      //   });
      return false; // this.router.navigate(['/Inicio']);
      }
  }

}
