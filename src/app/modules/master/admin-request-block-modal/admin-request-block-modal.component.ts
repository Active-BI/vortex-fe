import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { TenantsService } from 'app/modules/services/tenants.service';

@Component({
    selector: 'admin-request-block-modal',
    templateUrl: './admin-request-block-modal.component.html',
    styleUrls: ['./admin-request-block-modal.component.scss'],
})
export class AdminRequestBlockModalComponent {
    tenants = [];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private tenantsService: TenantsService
    ) {
        this.tenantsService.tenants().subscribe((tenants: any[]) => {
            this.tenants = tenants;
        });
    }

    onSubmit(): void {
        this.data.data();
    }
    voltar(): void {
        this.dialog.closeAll();
    }
}
