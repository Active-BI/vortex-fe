import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from 'app/modules/services/page.service';
import { TenantsService } from 'app/modules/services/tenants.service';
import { ToastrService } from 'ngx-toastr';
import { GestaoTenantEditComponent } from '../gestao-tenant-edit/gestao-tenant-edit.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
        private _dialog: MatDialog,
        private pageMasterServices: PageMasterService
    ) {
        super(
            fb,
            router,
            route,
            toastr,
            tenantsServices,
            _dialog,
            pageMasterServices
        );
    }

    override ngOnInit(): void {
        this.pageMasterServices.getPages().subscribe((d: any) => {
            this.dashboardsSelecteds = d;
            const dashboardList = d.map((page) => {
                return {
                    page_group: page.Page_Group.title,
                    name: page.title,
                    id: page.id,
                    selected: page.included,
                };
            });

            this.dashboardListReduced = dashboardList.reduce((acc, cur) => {
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
            this.form.patchValue({
                dashboard: d
                    .filter((dash) => dash.included === true)
                    .map((dash) => dash.id),
            });
        });
    }
    obterProjetos() {
        if (this.form.value.tenant_name.length === 0) {
            this.toast.error('Cliente não preenchido')
            return
        }
        this.tenantsServices.getProjects(this.form.value.tenant_name).subscribe({next: (value: any[]) => {
            if (value.length) {
                let dialogRef = this._dialog.open(DialogProjects, {
                    data: value
                });
            } else {
                this.toast.error('Cliente não possui projetos')
            }
        }, error: (error: any) => {
            this.toast.error('Cliente não possui projetos')
        }})
    }
    criar(): void {
        console.log(this.form.controls)
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


@Component({
    selector: 'dialog-projects',
    templateUrl: 'dialog-projects.html',
  })
  export class DialogProjects {
    projectList = []
    constructor(public dialogRef: MatDialogRef<DialogProjects>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.projectList = this.data
    }
  }
