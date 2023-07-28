import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from 'app/modules/services/dashboard.service';

@Component({
    selector: 'add_access_admin',
    templateUrl: './add_access_admin.component.html',
    styleUrls: ['./add_access_admin.component.scss'],
})
export class AddAdminAccessComponent implements OnInit {
    usuario;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private dashboardService: DashboardService
    ) {
        this.usuario = data.usuario;
    }
    ngOnInit(): void {
        this.globalmarketCategory.setValue(
            this.usuario.dashboards
                .filter((d) => d.included)
                .map((d) => d.dashboard_id)
        );
    }
    globalmarketCategory = new FormControl('');

    onSubmit(): void {
        this.dashboardService
            .postMasterDashboards(
                {
                    DashboardUserList: this.globalmarketCategory.value,
                    tenant_id: this.usuario.Tenant.id,
                },
                this.usuario.id
            )
            .subscribe((e) => {
                this.data.data();
            });
    }
    findValue() {
        return (
            this.usuario.dashboards.find(
                (d) => d.id === this.globalmarketCategory.value[0]
            )?.Dashboard.name || 'Selecione'
        );
    }

    voltar(): void {
        this.dialog.closeAll();
    }
}
