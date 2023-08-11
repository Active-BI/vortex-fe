import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/modules/services/admin.service';
import { listRoles } from 'app/modules/services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { ordersData } from '../usersUtils';
import { PageService } from 'app/modules/services/page.service';

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
        profession: ['', [Validators.required]],
        description: ['', [Validators.required]],
        rls_id: ['', [Validators.required]],
    });
    panelOpenState = false;
    id: string;
    ordersData = ordersData;
    user: any;
    dashboardList = [];
    selectedDashboardList = [];

    dashboardListReduced = [];
    listRoles = listRoles;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private adminSrv: AdminService,
        private pageService: PageService
    ) {
        this.id = this.route.snapshot.paramMap.get('id');
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
                };
            });
            this.dashboardListReduced = this.dashboardList.reduce(
                (acc, cur) => {
                    console.log(cur);
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
                this.adminSrv.getUserById(this.id).subscribe((e: any) => {
                    this.user = e;
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

                    this.form.patchValue({
                        id: this.user.id,
                        name: this.user.name,
                        email: this.user.contact_email,
                        rls_id: this.user.rls_id,
                        profession: this.user.profession,
                        description: this.user.description,
                    });
                });
            }
        });
    }

    ngOnInit(): void {
        this.form.controls.email.disable();
    }

    filteredVisions = [];
    checkedDash(item, index) {
        this.selectedDashboardList[index] = {
            ...item,
            selected: !item.selected,
        };
    }
    voltar(): void {
        this.router.navigate(['app/usuarios']);
    }

    redirectToEdit(id) {
        this.router.navigate([`app/usuarios-editar/${id}`]);
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
            this.adminSrv
                .updateUser({
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
