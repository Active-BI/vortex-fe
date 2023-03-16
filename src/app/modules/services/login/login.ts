import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export interface User {
    email: string;
    password: string;
}

export interface UserRegister extends User {
    name: string;
    passwordConfirmation: string;
    captchaResponse: string;
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.baseUrl;

    private resource = 'auth';

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    Login({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Observable<any> {
        return this.http.post(`${this.baseUrl}login`, { email, password });
    }

    Register({
        email,
        password,
        captchaResponse,
        name,
    }: UserRegister): Observable<any> {
        return this.http.post(`${this.baseUrl}${this.resource}`, {
            email,
            password,
            captchaResponse,
        });
    }
}
