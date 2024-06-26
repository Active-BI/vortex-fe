import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TenantsService } from 'app/modules/services/tenants.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-add-documentos',
    templateUrl: './add-documentos.component.html',
    styleUrls: ['./add-documentos.component.scss'],
})
export class AddDocumentosComponent implements OnInit {
    tenant_name;
    projetos;
    clienteSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private tenantService: TenantsService
    ) {}

    form = this.fb.group({
        clientes: ['', [Validators.required]],
        projetos: [[], [Validators.required, Validators.minLength(1)]],
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

    onSubmit(): void {}

    setProjects(e) {
        const cliente = this.clienteSubject.getValue();

        if (cliente?.tenant_name === e) return;

        this.setContextoCliente(
            this.data.cliente.find((c) => c.tenant_name === e)
        );
    }

    public setContextoCliente(novoContexto: any): void {
        this.form.enable();
        this.clienteSubject.next(novoContexto);
    }
}
