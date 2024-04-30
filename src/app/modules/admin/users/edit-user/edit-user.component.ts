import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { listRoles } from 'app/modules/services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { ordersData } from '../usersUtils';
import { PageService } from 'app/modules/services/page.service';
import { OfficeService } from 'app/modules/services/office.service';
import { UserService } from 'app/modules/services/user.service';
import { TenantsService } from 'app/modules/services/tenants.service';
import jwtDecode from 'jwt-decode';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
    myControl = new FormControl('');
    tenants: string[] = [];
    selectedTenant = this.tenants;
    visoes = new FormControl([]);
    projetos
    projetosControl = new FormControl([]);
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
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: [
            '',
            [
                Validators.required,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
                Validators.email,
            ],
        ],
        cargo: ['', [Validators.required]],
        office_id: ['', [Validators.required]],
        rls_id: ['', [Validators.required]],
        projects: [[], [Validators.required]]
    });
    panelOpenState = false;
    id: string;
    ordersData = ordersData;
    user: any;
    dashboardList = [];
    selectedDashboardList = [];
    outrosProjetos =[]
    dashboardListReduced = [];
    listRoles = listRoles;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private userSrv: UserService,
        private pageService: PageService,
        private office: OfficeService,
        private tenantsService: TenantsService,
    ) {
        this.id = this.route.snapshot.paramMap.get('id');

        this.changeReports();
    }
    selectOffice(name) {
        const office = this.cargos.find((c) => c.name === name).id;
        if (office)
            this.form.patchValue({
                office_id: office,
            });
    }
    changeReports(value = null) {
        let editar = false;
        this.route.url.subscribe(
            (a) => (editar = a[0].path.includes('editar'))
        );
        this.pageService.getDashboards().subscribe((e: any[]) => {
            this.dashboardList = e.map((tenant_dashboard) => {
                return {
                    page_group: tenant_dashboard.Page.Page_Group.title,
                    name: tenant_dashboard.Page.title,
                    id: tenant_dashboard.id,
                    selected: false,
                    roles: tenant_dashboard.Page.Page_Role.map(
                        (r) => r.Rls.name
                    ),
                };
            });
            this.dashboardListReduced = this.dashboardList.reduce(
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

            if (editar) {
                this.userSrv.getUserById(this.id).subscribe((e: any) => {
                    this.user = e;
                    const token = JSON.parse(localStorage.getItem('token'))
                    const decodedToken: any = jwtDecode(token)
         

                    this.selectedDashboardList = this.dashboardList.map(
                        (dash) => {
                            this.user.User_Page.find((utd) => {
                                if (utd.tenant_page_id === dash.id) {
                                    this.visoes.setValue([
                                        ...this.visoes.value,
                                        dash.id,
                                    ]);
                                }
                            });
                        }
                    );
                    this.office.getOffices().subscribe((e) => {
                        const office = e.find(
                            (c) => c.id === this.user.office_id
                        ).name;
                        this.form.patchValue({
                            cargo: office,
                        });
                    });
                        this.outrosProjetos = this.user.projects
                    this.form.patchValue({
                        id: this.user.id,
                        name: this.user.name,
                        projects: this.user.projects,
                        email: this.user.contact_email,
                        rls_id: value ? value : this.user.rls_id,
                        office_id: this.user.office_id,
                    });

                });
            }
        });
    }
    cargos = [];
    ngOnInit(): void {
        this.form.controls.email.disable();
        this.office.getOffices().subscribe((e) => {
            this.cargos = e.sort((a, b) => {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            });
            const office = this.cargos.find(
                (c) => c.id === this.form.value.office_id
            ).name;
            this.form.patchValue({
                cargo: office,
            });
        });

        const token = JSON.parse(localStorage.getItem('token'))
        const decoded = jwtDecode(token) as any
        this.tenantsService.getProjects(decoded.tenant_name).subscribe({
            next: (value: any[]) => {
                console.log(value)
                this.projetos =(value as string[]).filter((v: any) => decoded.projects.includes(v.id))
            },
            error: (error: any) => {
                console.log(error);
            },
        });
    }

    filteredVisions = [];
    checkedDash(item, index) {
        this.selectedDashboardList[index] = {
            ...item,
            selected: !item.selected,
        };
    }
    voltar(): void {
        this.router.navigate(['app/administrador/usuarios']);
    }

    redirectToEdit(id) {
        this.router.navigate([`app/administrador/usuarios-editar/${id}`]);
    }

    editar(): void {
        if (this.form.valid && this.myControl.valid) {
            this.pageService
                .postDashboards(
                    {
                        PageUserList: this.visoes.value,
                    },
                    this.id
                )
                .subscribe((e) => {});
            const form = this.form.value;
            delete form.cargo;
            this.userSrv
                .updateUser({
                    ...form,
                })
                .subscribe(
                    (e) => {
                        this.toastr.success('Editado com Sucesso');
                        // this.voltar();
                    },
                    ({ error }) => {
                        this.toastr.error(error.message);
                    }
                );
            this.ngOnInit();
        } else {
            this.form.markAllAsTouched();
        }
    }
}
