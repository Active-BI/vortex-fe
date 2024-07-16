import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { PageMasterService } from 'app/modules/services/page-master.service';
import { PMIService } from 'app/modules/services/PMI.service';
import { TenantsService } from 'app/modules/services/tenants.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'edit_access_admin',
    templateUrl: './edit_access_admin.component.html',
    styleUrls: ['./edit_access_admin.component.scss'],
})
export class EditAdminAccessComponent implements OnInit {
    usuario;
    dashboardListReduced;
    projetos;
    cliente;
    projetosControl = new FormControl([], [Validators.required]);
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private pageMasterService: PageMasterService,
        private pmiService: PMIService,

        private tenantService: TenantsService,
        private toast: ToastrService
    ) {
        this.usuario = data.usuario;
    }
    dashboardList;
    ngOnInit(): void {
        this.dashboardList = this.usuario.dashboards.map((tenant_dashboard) => {
            return {
                page_group: tenant_dashboard.Page.Page_Group.title,
                name: tenant_dashboard.Page.title,
                id: tenant_dashboard.page_id,
                selected: tenant_dashboard.included,
            };
        });
        this.dashboardListReduced = this.dashboardList.reduce((acc, cur) => {
            const findItem = acc.findIndex(
                (a) => a.page_group === cur.page_group
            );
            if (findItem >= 0) {
                acc[findItem].children.push(cur);
                return acc;
            }
            acc.push({
                page_group: cur.page_group,
                children: [cur],
            });

            return acc;
        }, []);
        this.cliente = this.usuario.tenant_name;
        this.tenantService.getProjects(this.cliente).subscribe({
            next: (value: any[]) => {
                this.projetos = value;
            },
            error: (error: any) => {
                console.log(error);
            },
        });

        this.form.setValue(
            this.usuario.dashboards
                .filter((d) => d.included === true)
                .map((d) => d.page_id)
        );
        this.email.setValue(this.usuario.contact_email);
        this.projetosControl.setValue(this.usuario.projects);
        this.email.disable();
    }

    form = new FormControl('');
    email = new FormControl('');

    onSubmit(): void {
        if (
            this.form.invalid ||
            this.email.invalid ||
            this.projetosControl.invalid
        ) {
            this.form.markAsTouched();
            this.email.markAsTouched();
            this.projetosControl.markAsTouched();
            this.toast.error('Formulário inválido');
            return;
        }
        // console.log(this.usuario);
        this.pageMasterService
            .patchReportsToTennant(
                {
                    DashboardUserList: this.form.value,
                    tenant_id: this.usuario.Tenant.id,
                    projetos: this.projetosControl.value,
                },

                this.usuario.id
            )
            .subscribe((e) => {
                this.data.data();
            });
    }
    findValue() {
        const findPages = this.usuario.dashboards.find(
            (d) => d.page_id === this.form.value[0]
        );
        return findPages?.Page?.title || 'Selecione';
    }

    voltar(): void {
        this.dialog.closeAll();
    }
}
