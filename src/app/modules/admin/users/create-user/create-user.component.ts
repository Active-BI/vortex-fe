import { Component, OnInit } from '@angular/core';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService, PreRegister } from 'app/modules/services/admin.service';

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
        adminSrv: AdminService,
        private adminSrv1: AdminService
    ) {
        super(fb, router, route, toastr, adminSrv);
    }

    override ngOnInit(): void {}

    criar(): void {
        if (this.form.valid) {
            delete this.form.value.id;
            const formPayload = this.form.value as PreRegister;
            this.adminSrv1.createPreRegister(formPayload).subscribe((e) => {
                this.toast.success('Usuário Criado com Sucesso');
                this.voltar();
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
