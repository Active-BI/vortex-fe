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
        console.log(this.usuario);
        this.form.setValue(
            this.usuario.dashboards
                .filter((d) => d.included === true)
                .map((d) => d.page_id)
        );
    }
    form = new FormControl('');

    onSubmit(): void {
        this.dashboardService
            .postMasterDashboards(
                {
                    DashboardUserList: this.form.value,
                    tenant_id: this.usuario.tenant_id,
                },
                this.usuario.id
            )
            .subscribe((e) => {
                this.data.data();
            });
    }
    findValue() {
        const findPages = this.usuario.dashboards.find(
            (d) => d.page_id === this.form.value[0]
        );
        return findPages?.Page?.title || 'Selecione';
    }

    voltar(): void {
        this.dialog.closeAll();
    }
}
