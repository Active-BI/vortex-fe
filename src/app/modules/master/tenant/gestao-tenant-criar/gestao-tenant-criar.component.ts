import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from 'app/modules/services/page.service';
import { TenantsService } from 'app/modules/services/tenants.service';
import { ToastrService } from 'ngx-toastr';
import { GestaoTenantEditComponent } from '../gestao-tenant-edit/gestao-tenant-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { PageMasterService } from 'app/modules/services/page-master.service';

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
        dialog: MatDialog,
        pageMasterService: PageMasterService
    ) {
        super(
            fb,
            router,
            route,
            toastr,
            tenantsServices,
            dialog,
            pageMasterService
        );
        pageMasterService.getPages().subscribe((d: any) => {
            this.dashboardsSelecteds = d;
        });
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
                    this.voltar();
                });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
