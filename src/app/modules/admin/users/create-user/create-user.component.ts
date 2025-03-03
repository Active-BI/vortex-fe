import { Component, OnInit } from '@angular/core';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PageService } from 'app/modules/services/page.service';
import { OfficeService } from 'app/modules/services/office.service';
import { UserService } from 'app/modules/services/user.service';
import { TenantsService } from 'app/modules/services/tenants.service';
import jwtDecode from 'jwt-decode';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent extends EditUserComponent implements OnInit {
    value = '';
    constructor(
        fb: FormBuilder,
        router: Router,
        route: ActivatedRoute,
        toastr: ToastrService,
        private toast: ToastrService,
        private _userSrv: UserService,
        private officeService: OfficeService,
        pageService: PageService,
        private _tenantsService: TenantsService,

    ) {
        super(fb, router, route, toastr, _userSrv, pageService, officeService, _tenantsService);
    }

    override ngOnInit(): void {
        // const token = JSON.parse(localStorage.getItem('token'))
        // const decodedToken: any = jwtDecode(token)
        // this.projetos = decodedToken.projects
        this.officeService.getOffices().subscribe((e) => {
            this.cargos = e.sort((a, b) => {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            });
        });

        const token = JSON.parse(localStorage.getItem('token'))
        const decoded = jwtDecode(token) as any
        this._tenantsService.getProjects(decoded.tenant_name).subscribe({
            next: (value: any[]) => {
                console.log(value)
                this.projetos =(value as string[]).filter((v: any) => decoded.projects.includes(v.id))
            },
            error: (error: any) => {
                console.log(error);
            },
        });
    }
    find(name) {
        const find = this.cargos.find((c) => c.name === name);
        console.log(find);
        return find;
    }
    criar(): void {
        if (!this.find(this.form.value.cargo)) {
            this.form.controls.cargo.reset();
            this.toast.error('Formulário inválido');
        }
        if (this.form.valid) {
            delete this.form.value.id;
            delete this.form.value.cargo;
            const formPayload = this.form.value as any;
            this._userSrv
                .createUser({
                    ...formPayload,
                })
                .subscribe(
                    (e) => {
                        this.toast.success('Usuário Criado com Sucesso');
                        this.redirectToEdit(e.user_id);
                    },
                    ({ error }) => {
                        this.toast.error(error.message);
                    }
                );
        } else {
            console.log(this.form.controls);
            this.toast.error('Formulário inválido');

            this.form.markAllAsTouched();
        }
    }
}
