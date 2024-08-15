import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TenantsService } from 'app/modules/services/tenants.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { DocumentsService } from 'app/modules/services/documents.service';
import { Router } from '@angular/router';
import { AuthService } from 'app/modules/services/auth/auth.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
    selector: 'app-add-documentos',
    templateUrl: './add-documentos.component.html',
    styleUrls: ['./add-documentos.component.scss'],
})
//extends DocumentosComponent
export class AddDocumentosComponent implements OnInit {
    tenant_name;
    formData: FormData;
    dataSource: MatTableDataSource<any>;
    files = [];
    clientes = [];
    projetos = [];
    clientesControl = new FormControl({} as any, [Validators.required]);
    projetosControl = new FormControl(
        [],
        [Validators.required, Validators.minLength(1)]
    );
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    clienteSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
    public cliente$: Observable<any> = this.clienteSubject.asObservable();
    canUploadOrDeleteFiles;

    form = this.fb.group({
        name: ['', Validators.required],
        extencion: ['', Validators.required],
        description: [''],
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public modalParams: any,
        private dialog: DialogRef,
        private toastr: ToastrService,
        private documentsService: DocumentsService,
        private router: Router,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.formData = this.modalParams.files;
  
        const fileName = this.modalParams.files.get('files').name.split('.')
        this.form.patchValue({
            name: fileName.slice(0, fileName.length - 1).join('.'),
            extencion: fileName[fileName.length - 1],
        });

        this.canUploadOrDeleteFiles =
            this.authService.GetUser().role_name === 'Master' ? true : false;
    }

    ngOnInit(): void {
        this.projetosControl.disable();

        this.documentsService.getClientProjectFilters().subscribe((res) => {
            this.clientes = res;
        });

        this.cliente$.subscribe((res) => {
            this.projetos = res.projects;
            this.projetosControl = new FormControl([]);
        });
    }


    updateDataSource(data) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        return this.dataSource;
    }
    setProjects(e) {
        const cliente = this.clienteSubject.getValue();

        if (cliente?.tenant_name === e) return;

        this.setContextoCliente(this.clientes.find((c) => c.id === e));
    }

    public setContextoCliente(novoContexto: any): void {
        this.projetosControl.enable();
        this.clienteSubject.next(novoContexto);
    }

    UploadFiles() {
        const files = this.formData.get('files');

        if (!files || (files instanceof FileList && files.length === 0)) {
            this.toastr.error('Nenhum arquivo selecionado');
            return;
        }
        if (this.projetosControl.value.length) {
            this.dialog.close();
            this.documentsService
                .UploadFiles(
                    this.formData,
                    this.clientesControl.value,
                    this.projetosControl.value,
                    this.form.value.description
                )
                .subscribe(() => {
                    this.modalParams.data();
                });
                this
        } else {
            this.toastr.error('Formulário inválido');

            this.projetosControl.markAllAsTouched();
            this.clientesControl.markAllAsTouched();
        }
    }
}
