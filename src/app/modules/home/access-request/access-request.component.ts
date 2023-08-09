import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminRequestService } from 'app/modules/services/admin-request.service';
import { ToastrService } from 'ngx-toastr';

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

        if (this.setTenat) {
            this.form = this._formBuilder.group({
                email: [this.form.value.email, [Validators.required]],
                name: [this.form.value.name, [Validators.required]],
                description: [this.form.value.description],
                profession: [this.form.value.profession, [Validators.required]],
                company_name: [
                    this.form.value.company_name,
                    [Validators.required],
                ],
                company_cnpj: [
                    this.form.value.company_cnpj,
                    [Validators.required],
                ],
                company_description: [
                    this.form.value.company_description,
                    [Validators.required],
                ],
            });
        } else {
            this.form = this._formBuilder.group({
                email: [this.form.value.email, [Validators.required]],
                name: [this.form.value.name, [Validators.required]],
                description: [this.form.value.description],
                profession: [this.form.value.profession, [Validators.required]],
                company_name: [this.form.value.company_name],
                company_cnpj: [this.form.value.company_cnpj],
                company_description: [this.form.value.company_description],
            });
        }
    }
    form;
    checkScreenSize() {
        return window.innerWidth >= 768;
    }
    constructor(
        private _formBuilder: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private adminRequestService: AdminRequestService,
        public dialog: MatDialog
    ) {
        this.form = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', [Validators.required]],
            description: [''],
            profession: ['', [Validators.required]],
            company_name: [''],
            company_cnpj: [''],
            company_description: [''],
        });
    }

    submit() {
        if (!this.form.valid) {
            this.toastr.error('Campos inválidos');
            return;
        }
        this.adminRequestService.postAdminRequests(this.form.value).subscribe(
            (res) => {
                this.router.navigate(['/home']);
            },
            ({ error }) => this.toastr.error(error.message)
        );
    }
    ngOnInit(): void {}
}
