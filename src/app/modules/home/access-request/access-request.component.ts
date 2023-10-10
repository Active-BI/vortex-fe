import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
    foods = [
        { value: 'comercio', viewValue: 'Comércio' },
        { value: 'saude', viewValue: 'Saúde' },
        { value: 'varejo', viewValue: 'Varejo' },
        { value: 'moda', viewValue: 'Moda' },
        { value: 'investimento', viewValue: 'Investimento' },
        { value: 'tecnnologia', viewValue: 'Tecnologia' },
    ].sort((a, b) => a.viewValue.localeCompare(b.viewValue));
    form = this._formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required]],
        segmento: ['', [Validators.required]],
        tenant: ['', [Validators.required]],
        company_name: ['', [Validators.required]],
        company_cnpj: ['', [Validators.required]],
        company_description: ['', [Validators.required]],
    });
    OpcaoPainel(value) {
        console.log(value);
    }
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
