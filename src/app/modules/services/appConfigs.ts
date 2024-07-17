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
export class AppConfigs {
    baseUrl = environment.baseUrl;
    
    app_image = '';
    bg_color = '';
    logo = '';

    constructor(
        private http: HttpClient,
        private toast: ToastrService
    ) {
        this.http.get(`${this.baseUrl}login/app/image`).pipe(
            catchError(err => {
                this.toast.error("Falha ao obter configurações visuais");
                return throwError(() => err);
            })
        ).subscribe((res: any) => {
            this.app_image = res.app_image;
            this.bg_color = res.bg_color;
            this.logo = res.tenant_image
        })
    }
}
