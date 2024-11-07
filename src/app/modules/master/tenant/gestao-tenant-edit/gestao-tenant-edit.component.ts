import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
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
    tenants: string[] = [];
    selectedTenant = this.tenants;
    ufs = ufsBrasileiras;
    size = porte;
    segments = segmentos;
    value = '';
    onKey(value) {
        this.selectedTenant = this.search(value);
    }

    search(value: string) {
        let filter = value.toLowerCase();
        return this.tenants.filter((option: any) =>
            option.nome_cliente.toLowerCase().startsWith(filter)
        );
    }

    onColorSelected(color: string, label) {
        this.form.patchValue({
            [label]: color,
        });
    }
    clearFileSelection() {
        this.form.patchValue({
            tenant_image: '',
        });
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.form.patchValue({
                    tenant_image: reader.result as string,
                });
            };

            reader.readAsDataURL(file);
        }
    }

    visionsSelecteds = [];
    form = this.fb.group({
        id: [''],
        tenant_name: ['', [Validators.required, Validators.minLength(3)]],
        tenant_cnpj: ['', [Validators.required, Validators.minLength(3)]],
        tenant_color: ['', [Validators.required, Validators.minLength(6)]],
        tenant_image: ['', [Validators.required]],
        company_uf: ['', [Validators.required]],
        company_size: ['', [Validators.required]],
        company_segment: ['', [Validators.required]],
        company_description: [''],
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
                    tenant_color: this.tenant.tenant_color || '#fffffff',
                    tenant_image: this.tenant.tenant_image,
                    company_description: this.tenant.company_description,
                    company_segment: this.tenant.company_segment,
                    company_size: this.tenant.company_size,
                    company_uf: this.tenant.company_uf,
                });
            });
        }
    }

    obterProjetos() {
        if (this.form.value.tenant_name.length === 0) {
            this.toastr.error('Cliente não preenchido');
            return;
        }
        this.tenantsService.getProjects(this.form.value.tenant_name).subscribe({
            next: (value: any[]) => {
                if (value.length) {
                    this.dialog.open(EditDialogProjects, {
                        data: value,
                    });
                } else {
                    this.toastr.error('Cliente não possui projetos');
                }
            },
            error: (error: any) => {
                this.toastr.error('Cliente não possui projetos');
            },
        });
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
        if (this.form.valid) {
            this.tenantsService
                .updateTenant(this.id, {
                    ...this.form.value,
                })
                .subscribe((e) => {
                    this.toastr.success('Editado com Sucesso');
                    this.voltar();
                    // this.voltar();
                });
        } else {
            this.form.markAllAsTouched();
        }
    }
}

@Component({
    selector: 'editDialog-projects',
    templateUrl: 'editDialog-projects.html',
})
export class EditDialogProjects {
    projectList = [];
    constructor(
        public dialogRef: MatDialogRef<EditDialogProjects>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.projectList = this.data;
    }
}

const ufsBrasileiras = [
    'AC', // Acre
    'AL', // Alagoas
    'AP', // Amapá
    'AM', // Amazonas
    'BA', // Bahia
    'CE', // Ceará
    'DF', // Distrito Federal
    'ES', // Espírito Santo
    'GO', // Goiás
    'MA', // Maranhão
    'MT', // Mato Grosso
    'MS', // Mato Grosso do Sul
    'MG', // Minas Gerais
    'PA', // Pará
    'PB', // Paraíba
    'PR', // Paraná
    'PE', // Pernambuco
    'PI', // Piauí
    'RJ', // Rio de Janeiro
    'RN', // Rio Grande do Norte
    'RS', // Rio Grande do Sul
    'RO', // Rondônia
    'RR', // Roraima
    'SC', // Santa Catarina
    'SP', // São Paulo
    'SE', // Sergipe
    'TO', // Tocantins
];
const segmentos = [
    'Agricultura',
    'Alimentos e Bebidas',
    'Artesanato',
    'Beleza',
    'Construção e Reforma',
    'Economia Criativa',
    'Mercado Digital',
    'Mercearia e Supermercados',
    'Metal Mecânico',
    'Moda',
    'Móveis e Decoração',
    'Pecuária',
    'Petroquímico e Mineração',
    'Saúde e Bem-estar',
    'Tecnologia',
    'Turismo',
    'Veículos',
    'Outros',
];
const porte = [
    'MEI',
    'EI',
    'EIRELI',
    'Ltda',
    'SS',
    'SA',
    'Sem fins lucrativos',
];
