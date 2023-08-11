import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageMasterService } from 'app/modules/services/page-master.service';
import { TenantsService } from 'app/modules/services/tenants.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'admin-request-confirmation-modal',
    templateUrl: './admin-request-confirmation-modal.component.html',
    styleUrls: ['./admin-request-confirmation-modal.component.scss'],
})
export class AdminRequestConfirmationModalComponent {
    tenants = [];
    selectedTenant = '';

    isFormDisabled = false;
    toggleForm() {
        this.isFormDisabled = !this.isFormDisabled;
        if (!this.isFormDisabled) {
            this.form = this.fb.group({
                tenant: ['', [Validators.required]],
            });
        }
        if (this.isFormDisabled) {
            this.form = this.fb.group({
                tenant_name: [
                    this.data.user_data.company_name,
                    [Validators.required],
                ],
                tenant_cnpj: [
                    this.data.user_data.company_cnpj,
                    [Validators.required],
                ],
                tenant_desription: [
                    this.data.user_data.company_description,
                    [Validators.required],
                ],
                dashboard: [[], [Validators.required]],
            });
        }
    }
    id = '';
    dashboardsSelecteds = [];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private tenantsService: TenantsService,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private pageMasterService: PageMasterService
    ) {
        this.id = this.route.snapshot.paramMap.get('id');

        this.pageMasterService.getPageById(this.id).subscribe((d: any[]) => {
            this.dashboardsSelecteds = d;
        });
        this.form = this.fb.group({
            tenant: ['', [Validators.required]],
        });

        this.tenantsService.tenants().subscribe((tenants: any[]) => {
            this.tenants = tenants;
        });
    }
    form: FormGroup;
    onSubmit(): void {
        if (!this.form.valid) {
            this.toastr.error('Dados incompletos');
            return;
        }
        if (this.isFormDisabled) {
            this.data.criarTenant(this.form.value);
        } else {
            this.data.data(this.form.value.tenant);
        }
    }
    click() {
        console.log(this.form.value.dashboard);
    }
    voltar(): void {
        this.dialog.closeAll();
    }
}
