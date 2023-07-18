import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    Validators,
    FormArray,
    FormControl,
    FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    AdminService,
    getAllRequest,
} from 'app/modules/services/admin.service';
import { listRoles } from 'app/modules/services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { PeriodicElement } from '../list-users/list-users.component';
import { ordersData } from '../usersUtils';
import { PMIService } from 'app/modules/services/PMI.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
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
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: [
            '',
            [
                Validators.required,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            ],
        ],
        // tenant_id: ['', [Validators.required]],
        identification: ['', [Validators.required]],
        role_id: ['', [Validators.required]],
    });
    panelOpenState = false;
    id: string;
    ordersData = ordersData;
    user: getAllRequest;

    listRoles = listRoles;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private adminSrv: AdminService,
        private pmiServices: PMIService
    ) {
        this.id = this.route.snapshot.paramMap.get('id');
        let editar = false;
        this.route.url.subscribe(
            (a) => (editar = a[0].path.includes('editar'))
        );
        if (editar) {
            this.adminSrv.getUserById(this.id).subscribe((e) => {
                this.user = e;
                let tenant;

                this.form.patchValue({
                    id: this.user.id,
                    name: this.user.name,
                    email: this.user.email,
                    role_id: this.user.role_id,
                    identification: this.user.identification,
                });
            });
        }
    }

    ngOnInit(): void {
        this.form.controls.email.disable();
    }

    filteredVisions = [];

    voltar(): void {
        this.router.navigate(['app/usuarios']);
    }

    redirectToEdit(id) {
        this.router.navigate([`app/usuarios-editar/${id}`]);
    }

    editar(): void {
        if (this.form.valid && this.myControl.valid) {
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
