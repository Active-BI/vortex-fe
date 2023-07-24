import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ordersData } from 'app/modules/admin/users/usersUtils';
import { PMIService } from 'app/modules/services/PMI.service';
import { AdminService } from 'app/modules/services/admin.service';
import { DashboardService } from 'app/modules/services/dashboard.service';
import { listRoles } from 'app/modules/services/roles.service';
import { TenantsService } from 'app/modules/services/tenants.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-gestao-tenant-edit',
    templateUrl: './gestao-tenant-edit.component.html',
    styleUrls: ['./gestao-tenant-edit.component.scss'],
})
export class GestaoTenantEditComponent implements OnInit {
    myControl = new FormControl('');
    tenants: string[] = [];
    selectedTenant = this.tenants;

    onKey(value) {
        this.selectedTenant = this.search(value);
    }

    search(value: string) {
        let filter = value.toLowerCase();
        return this.tenants.filter((option: any) =>
            option.nome_cliente.toLowerCase().startsWith(filter)
        );
    }

    visionsSelecteds = [];
    form = this.fb.group({
        id: [''],
        tenant_name: ['', [Validators.required, Validators.minLength(3)]],
        active: ['', [Validators.required]],
    });
    panelOpenState = false;
    id: string;
    ordersData = ordersData;
    tenant: any;

    listRoles = listRoles;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private tenantsService: TenantsService,
        private pmiServices: PMIService,
        private dashboardService: DashboardService
    ) {
        this.id = this.route.snapshot.paramMap.get('id');
        let editar = false;
        this.route.url.subscribe((a) => {
            editar = a[2].path.includes('editar');
        });
        if (editar) {
            this.tenantsService.tenant(this.id).subscribe((e: any) => {
                this.tenant = e;

                this.form.patchValue({
                    id: this.tenant.id,
                    tenant_name: this.tenant.tenant_name,
                    active: this.tenant.active,
                });
            });
        }
    }

    ngOnInit(): void {}

    voltar(): void {
        this.router.navigate(['master/gestao/tenants']);
    }

    redirectToEdit(id) {
        this.router.navigate([`/master/gestao/tenants/editar/` + id]);
    }

    editar(): void {
        if (this.form.valid && this.myControl.valid) {
            console.log(this.form.value);
            this.tenantsService
                .updateTenant(this.id, {
                    ...this.form.value,
                })
                .subscribe((e) => {
                    this.toastr.success('Editado com Sucesso');
                    this.voltar();
                });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
