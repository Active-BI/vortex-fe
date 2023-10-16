import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteModalComponent } from 'app/modules/admin/delete-modal/delete-modal.component';
import { ordersData } from 'app/modules/admin/users/usersUtils';
import { PageMasterService } from 'app/modules/services/page-master.service';
import { listRoles } from 'app/modules/services/roles.service';
import { TenantsService } from 'app/modules/services/tenants.service';
import jwtDecode from 'jwt-decode';
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
        tenant_cnpj: ['', [Validators.required, Validators.minLength(3)]],
        dashboard: [[], [Validators.required]],
    });

    panelOpenState = false;
    id: string;
    ordersData = ordersData;
    tenant: any;
    dashboardsSelecteds = [];
    listRoles = listRoles;

    dashboardListReduced = [];
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private tenantsService: TenantsService,
        private dialog: MatDialog,
        private pageMasterService: PageMasterService
    ) {
        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        let editar = false;
        this.route.url.subscribe((a) => {
            editar = a[2].path.includes('editar');
        });

        if (editar) {
            this.pageMasterService
                .getPageByTenantId(this.id)
                .subscribe((d: any[]) => {
                    this.dashboardsSelecteds = d;

                    const dashboardList = d.map((page) => {
                        return {
                            page_group: page.Page_Group.title,
                            name: page.title,
                            id: page.id,
                            selected: page.included,
                        };
                    });

                    this.dashboardListReduced = dashboardList.reduce(
                        (acc, cur) => {
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
                        },
                        []
                    );
                    this.form.patchValue({
                        dashboard: d
                            .filter((dash) => dash.included === true)
                            .map((dash) => dash.id),
                    });
                });
            this.tenantsService.tenant(this.id).subscribe((e: any) => {
                this.tenant = e;
                this.form.patchValue({
                    id: this.tenant.id,
                    tenant_name: this.tenant.tenant_name,
                    tenant_cnpj: this.tenant.tenant_cnpj,
                });
            });
        }
    }

    voltar(): void {
        this.router.navigate(['master/gestao/tenants']);
    }

    redirectToEdit(id) {
        this.router.navigate([`/master/gestao/tenants/editar/` + id]);
    }
    deletarUsuario(id): void {
        const decoded: any = jwtDecode(localStorage.getItem('token'));
        if (decoded.userId === id) {
            this.toastr.error('Não é possível excluir usuário em uso');
            return;
        }
        this.dialog.open(DeleteModalComponent, {
            data: {
                nome: 'Usuários',
                data: () => {
                    this.dialog.closeAll();
                    this.tenantsService.removeTenant(id).subscribe(() => {
                        this.toastr.success('Desativado com Sucesso');
                        this.voltar();
                    });
                },
            },
        });
    }

    editar(): void {
        if (this.form.valid && this.myControl.valid) {
            this.tenantsService
                .updateTenant(this.id, {
                    ...this.form.value,
                })
                .subscribe((e) => {
                    this.toastr.success('Editado com Sucesso');
                    // this.voltar();
                });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
