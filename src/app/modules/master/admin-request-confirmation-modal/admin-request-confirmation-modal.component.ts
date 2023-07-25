import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
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
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private tenantsService: TenantsService,
        private fb: FormBuilder,
        private toastr: ToastrService
    ) {
        this.tenantsService.tenants().subscribe((tenants: any[]) => {
            this.tenants = tenants;
        });
    }
    form = this.fb.group({
        tenant: ['', [Validators.required]],
    });
    onSubmit(): void {
        if (!this.form.valid) {
            this.toastr.error('Ambiente não selecionado');
            return;
        }
        this.data.data(this.form.value.tenant);
    }
    voltar(): void {
        this.dialog.closeAll();
    }
}
