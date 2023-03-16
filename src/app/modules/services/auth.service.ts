import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
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
export class AuthService {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
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

    userName: string;

    jwtHelper = new JwtHelperService();

    login(user: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.baseUrl}login`, user);
    }

    register(user): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}user`, user);
    }

    // getVisionsForUser() {
    //     // const token = this.getAccessToken();
    //     const decodedToken: any = decode(token);
    //     const visions = decodedToken.visions;
    //     return visions;
    // }

    // getRolesFromUser() {
    //     // const token = this.getAccessToken();
    //     const roles = this.getRoles(token);
    //     return roles;
    // }

    logout() {
        const decodedToken = decode<any>(localStorage.getItem('ApiToken'));
        localStorage.removeItem(tokenIdKey);
        localStorage.removeItem(tokenAccessKey);
        localStorage.removeItem('ApiToken');
        this.router.navigate(['login']);
    }

    isLoginToken(token: string) {
        const decodedToken: any = decode(token);
        if (decodedToken.perfil == null || decodedToken.perfil == [])
            return false;
        else return true;
    }

    persistApiToken(apiToken: string) {
        localStorage.setItem('ApiToken', apiToken);
        this.saveUserLoggedIn(apiToken);
    }

    isLogeddIn() {
        const user = localStorage.getItem('ApiToken');
        if (user == undefined) return false;

        if (user != undefined && !this.jwtHelper.isTokenExpired(user)) {
            const decoded = decode<any>(user);
            const email: string = decoded.email;
            this.updateUserLogin({ name: email, email: email });
            return true;
        }
        return false;
    }

    isLoginRecaptha() {
        const isRecaptcha = localStorage.getItem('loginCaptcha');
        return Boolean(isRecaptcha);
    }

    getRoles(token: string): String[] {
        const decodedToken = decode<any>(token);
        return decodedToken?.perfil;
    }

    getUser() {
        const userEmail = localStorage.getItem('userLogged');
        const user = { email: userEmail, name: userEmail };
        this.updateUserLogin(user);
        return user;
    }

    saveUserLoggedIn(token: string) {
        const decodedToken = decode<any>(token);
        localStorage.setItem('userLogged', decodedToken.email);
        localStorage.setItem('username', decodedToken.email);
        this.updateUserLogin({
            email: decodedToken.email,
            name: decodedToken.email,
        });
    }

    setAuthADFSToken(fragment) {
        const parsedHash = new URLSearchParams(fragment);
        const token = parsedHash.get('access_token');
        const idToken = parsedHash.get('id_token');

        const decodedToken = decode<any>(parsedHash.get('access_token'));
        localStorage.setItem('username', decodedToken.upn);
        localStorage.setItem(tokenIdKey, idToken);
        localStorage.setItem(tokenAccessKey, token);
        const username = localStorage.getItem('username');
        this.updateUserLogin({ name: username, email: username });

        // Delegado para o componente login-adfs
        // this.router.navigate(['../dashboard'], {relativeTo: this.route})
    }

    isTokenValid(token: string) {
        return this.jwtHelper.isTokenExpired(token);
    }

    clearTokens(): void {
        localStorage.clear();
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

    reset2FA(email: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/auth/resetTFA/${email}`);
    }
}
