import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

    form = this._formBuilder.group({
        email: ['', Validators.required],
        name: ['', Validators.required],
        description: [''],
        profession: ['', Validators.required],
        company_name: ['', Validators.required],
        company_cnpj: ['', Validators.required],
        company_description: ['', Validators.required],
    });
    checkScreenSize() {
        return window.innerWidth >= 768;
    }
    constructor(
        private _formBuilder: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private adminRequestService: AdminRequestService
    ) {}

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
