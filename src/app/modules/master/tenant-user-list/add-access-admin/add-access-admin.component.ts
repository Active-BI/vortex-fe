import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageMasterService } from 'app/modules/services/page-master.service';
import { TenantsService } from 'app/modules/services/tenants.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-access-admin',
    templateUrl: './add-access-admin.component.html',
    styleUrls: ['./add-access-admin.component.scss'],
})
export class AddAccessAdminComponent implements OnInit {
    tenant_name;
    projetos;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private pageMasterService: PageMasterService,
        private tenantService: TenantsService,
    ) {
        console.log(data.tenant_id);
    }
    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required]],
        projetos: [[], [Validators.required]],
    });

    ngOnInit(): void {
        this.tenantService.tenant(this.data.tenant_id).subscribe({
            next: (value: any) => {
                this.tenant_name = value.tenant_name;

                this.tenantService.getProjects(this.tenant_name).subscribe({
                    next: (value: any[]) => {
                        this.projetos = value;
                    },
                    error: (error: any) => {
                        console.log(error);
                    },
                });
            },
            error: (error: any) => {
                console.log(error);
            },
        });
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.toastr.error('Formulário inválido');
            return;
        }
        this.pageMasterService
            .PostAdminUsersByTenantId(this.data.tenant_id, this.form.value)
            .subscribe(
                (e) => {
                    this.data.data();
                },
                (error) => {
                    console.log(error);
                    this.toastr.error(error.error.message);
                },
            );
    }
}
