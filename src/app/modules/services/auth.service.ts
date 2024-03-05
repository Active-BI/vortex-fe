import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';
import { User } from 'app/models/User';
import { UserCreds } from 'app/models/UserCreds';

export const tokenIdKey: string = 'cX1pzgAxlAheYIqNzlVzfLR2fBaKgzxv';
export const tokenAccessKey: string = 'R8sKJUcxXrIPB86VemjQJ3DdbMb0LGBy';
const urlLogout =
    'https://wfs-ish.ish.com.br/adfs/oauth2/logout?client_id=3bc4f023-cdc0-48dc-8d10-9fdd6b1d523d';

export const LIMIT_TFA = 5;

@Injectable({
    providedIn: 'root',
})
export class LocalAuthService {
    constructor(
        private router: Router,
        private http: HttpClient,
        private toast: ToastrService
    ) {
        const username = localStorage.getItem('username');
        this.updateUserLogin({ name: username, email: username });
    }

    user = { name: '', email: '' };

    baseUrl = environment.baseUrl;

    // userLogged = new BehaviorSubject<User>(this.user);
    userLogged = new EventEmitter<User>();
    updateUserLogin(user: User) {
        this.userLogged.emit(user);
    }

    tfa(pin): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}login/tfa`, pin).pipe(
            map((result) => {
                return result;
            }),
            catchError((err) => {
                if (err.status === 400) this.toast.error(err.error.message);
                return err;
            })
        );
    }

    userName: string;

    jwtHelper = new JwtHelperService();

    login(user: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.baseUrl}login`, user);
    }
    get_app_image(): Observable<any> {
        return this.http.get(`${this.baseUrl}login/app/image`);
    }

    resetPass(email: string): Observable<any> {
        return this.http.get(`${this.baseUrl}login/reset-pass/${email}`);
    }

    setNewPass(payload: { password: string; token: string }): Observable<any> {
        return this.http.post(`${this.baseUrl}login/set-new-pass`, payload);
    }
    register(user): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}login/register`,
            user,
        );
    }

    logout() {
        localStorage.removeItem(tokenIdKey);
        localStorage.removeItem(tokenAccessKey);
        localStorage.clear();
        this.router.navigate(['login']);
    }

    getUser() {
        const userEmail = localStorage.getItem('userLogged');
        const user = { email: userEmail, name: userEmail };
        this.updateUserLogin(user);
        return user;
    }

    // getUserFirstName() {
    //     const token = localStorage.getItem('ApiToken');
    //     const { firstName } = decode<any>(token);
    //     return firstName;
    // }

    // getTfa(): Observable<any> {
    //     return this.http.get<any>(`${this.baseUrl}/tfa`);
    // }

    // getAccessToken(): string {
    //     return localStorage.getItem('ApiToken');
    // }
}
