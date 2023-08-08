import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminRequestService } from 'app/modules/services/admin-request.service';
import { ToastrService } from 'ngx-toastr';
import { RequestModalComponent } from './request-modal/request-modal.component';

@Component({
    selector: 'app-access-request',
    templateUrl: './access-request.component.html',
    styleUrls: ['./access-request.component.scss'],
})
export class AccessRequestComponent implements OnInit {
    dashboardsSelecteds = [];
    setTenat = false;
    atualizarValor() {
        this.setTenat = !this.setTenat;
    }
    form = this._formBuilder.group({
        email: ['', [Validators.required]],
        name: ['', [Validators.required]],
        description: [''],
        profession: ['', [Validators.required]],
        company_name: [''],
        company_cnpj: [''],
        company_description: [''],
    });
    checkScreenSize() {
        return window.innerWidth >= 768;
    }
    constructor(
        private _formBuilder: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private adminRequestService: AdminRequestService,
        public dialog: MatDialog
    ) {}

    submit() {
        const validator = this.setTenat === true ? [Validators.required] : [];
        this.form.get('company_name').setValidators(validator);
        this.form.get('company_cnpj').setValidators(validator);
        this.form.get('company_description').setValidators(validator);
        if (!this.form.valid) {
            this.toastr.error('Campos inválidos');
            return;
        }
        this.adminRequestService.postAdminRequests(this.form.value).subscribe(
            (res) => {
                this.dialog.open(RequestModalComponent, {
                    data: {
                        dados: this.form.value,
                        data: () => {
                            this.dialog.closeAll();
                            this.router.navigate(['/home']);
                        },
                    },
                });
            },
            ({ error }) => this.toastr.error(error.message)
        );
    }
    ngOnInit(): void {}
}
