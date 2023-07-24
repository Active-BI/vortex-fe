import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PMIService } from 'app/modules/services/PMI.service';
import { DashboardService } from 'app/modules/services/dashboard.service';
import { TenantsService } from 'app/modules/services/tenants.service';
import { ToastrService } from 'ngx-toastr';
import { GestaoTenantEditComponent } from '../gestao-tenant-edit/gestao-tenant-edit.component';

@Component({
    selector: 'app-gestao-tenant-criar',
    templateUrl: './gestao-tenant-criar.component.html',
    styleUrls: ['./gestao-tenant-criar.component.scss'],
})
export class GestaoTenantCriarComponent
    extends GestaoTenantEditComponent
    implements OnInit
{
    value = '';
    constructor(
        fb: FormBuilder,
        router: Router,
        route: ActivatedRoute,
        toastr: ToastrService,
        private toast: ToastrService,
        private tenantsServices: TenantsService,
        pmiServices: PMIService,
        dashboardService: DashboardService
    ) {
        super(
            fb,
            router,
            route,
            toastr,
            tenantsServices,
            pmiServices,
            dashboardService
        );
    }

    override ngOnInit(): void {}

    criar(): void {
        if (this.form.valid) {
            delete this.form.value.id;
            const formPayload = this.form.value as any;
            this.tenantsServices
                .createTenant({
                    ...formPayload,
                })
                .subscribe((e: any) => {
                    this.toast.success('Usuário Criado com Sucesso');
                    this.redirectToEdit(e.id);
                });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
