import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private jwtItils = new JwtHelperService();

    constructor(private toastr: ToastrService, private router: Router) {}

    // userLoggedIn: string

    private _user: ReplaySubject<any> = new ReplaySubject<any>(1);

    set user(value: any) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<any> {
        return this._user.asObservable();
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['auth/sign-out']);
    }

    GetUser(): any {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const decoded = jwtDecode(token);
            return decoded
        } catch (Error) {
            this.toastr.error('Falha ao obter dados do usuário')
            return false;
        }
    }
    isLoggedIn(): boolean {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        try {
            this.jwtItils.decodeToken(token);
            return true;
        } catch (Error) {
            localStorage.removeItem('token');
            localStorage.clear();
            // window.location.assign('/login')
            return false;
        }
    }
}
