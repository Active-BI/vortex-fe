import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AppConfigs {
    baseUrl = environment.baseUrl;
    
    app_image = '';
    bg_color = '';
    logo = '';

    tenant_image = '';
    tenant_color = '#fffffff';

    constructor(
        private http: HttpClient,
        private toast: ToastrService,
        private authService: AuthService
    ) {
        this.getAppVisualConfigs();

        if (this.authService.isLoggedIn()) {
            this.getTenantVisualConfigs();
        }
    }

    removeTenantConfigs() {
        this.tenant_image = '';
        this.tenant_color = '';
    }

    getTenantVisualConfigs(){
        this.http.get(`${this.baseUrl}app-setup/tenant-layout`).pipe(
            catchError(err => {
                this.toast.error("Falha ao obter configurações visuais do ambiente");
                return throwError(() => err);
            })
        ).subscribe((res: any) => {
            this.tenant_image = res.tenant_image;
            this.tenant_color = res.tenant_color;
        })
    }

    getAppVisualConfigs(){
        this.http.get(`${this.baseUrl}app-setup/layout`).pipe(
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
