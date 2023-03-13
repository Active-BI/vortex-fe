import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    Validators,
    FormArray,
    FormControl,
    FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/modules/services/admin.service';
import { listRoles } from 'app/modules/services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { PeriodicElement } from '../list-users/list-users.component';
import { ordersData } from '../usersUtils';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
    myControl = new FormControl('');
    visionsSelecteds = [];
    form = this.fb.group({
        id: [''],
        nome: ['', [Validators.required, Validators.minLength(3)]],
        email: [
            '',
            [
                Validators.required,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            ],
        ],
        emailContato: [
            '',
            [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        ],
        identificacao: ['', [Validators.required]],
        perfilId: ['', [Validators.required]],
        visions: [[]],
        menus: [[]],
    });
    panelOpenState = false;
    id: string;
    ordersData = ordersData;
    user: any;

    visoes = [];

    listRoles = listRoles;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private adminSrv: AdminService
    ) {
        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.form.controls.email.disable();
        console.log(this.id);
        this.adminSrv.getUserById(this.id).subscribe((e: any) => {
            this.user = e;
            // const visoesName = this.user.userVisions.map((x) => x.vision.name);
            console.log(e);
            this.form.patchValue({
                id: this.user.id,
                nome: this.user.nome,
                email: this.user.email,
                perfilId: this.user.perfilId,
                emailContato: this.user.emailContato,
                identificacao: this.user.identificacao,
                // visions: visoesName,
                menus: [],
            });
            // this.visionsSelecteds = visoesName;

            this.adminSrv.getVisions().subscribe((e: any) => {
                this.visoes = e;
                this.filteredVisions = e;
            });
        });
    }

    resetfilteredVisions() {
        this.filteredVisions = this.filteredVisions.filter(
            (a) => !this.visionsSelecteds.includes(a.name)
        );
    }

    filteredVisions = [];

    filterVisions(e: any) {
        this.filteredVisions = this.visoes.filter((a) =>
            a.name.includes(e.toUpperCase())
        );
    }

    voltar(): void {
        this.router.navigate(['app/usuarios']);
    }

    onChange(e) {
        if (this.visoes.find((a) => a.name === e)) {
            const value = this.form.value.visions;
            value.push(e);
            this.visionsSelecteds = value;
            this.form.patchValue({
                visions: value,
            });

            this.myControl.setValue('');
            this.filterVisions('');
        }
    }

    redirectToEdit(id) {
        this.router.navigate([`app/usuarios-editar/${id}`]);
    }

    deletarVisao(name) {
        this.visionsSelecteds = this.visionsSelecteds.filter((a) => a !== name);
        this.form.patchValue({
            visions: this.visionsSelecteds,
        });
    }

    editar(): void {
        if (this.form.valid && this.myControl.valid) {
            this.adminSrv
                .updateUser(this.form.value as PeriodicElement)
                .subscribe((e) => {
                    this.toastr.success('Editado com Sucesso');
                });
            this.voltar();
        } else {
            this.form.markAllAsTouched();
        }
    }
}
