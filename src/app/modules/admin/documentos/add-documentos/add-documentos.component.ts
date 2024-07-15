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
import jwtDecode from 'jwt-decode';
import { AuthService } from 'app/modules/services/auth/auth.service';

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
    myControl = new FormControl('', [Validators.required]);
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
        })

    constructor(
        @Inject(MAT_DIALOG_DATA) public modalParams: any,
        private tenantsService: TenantsService,
        private toastr: ToastrService,
        private documentsService: DocumentsService,
        private router: Router,
        private authService: AuthService,
        private fb: FormBuilder
    ) {

        this.formData = this.modalParams.files;
        this.form.patchValue({name: this.modalParams.files.get('files').name.split('.')[0], extencion: this.modalParams.files.get('files').name.split('.')[1]});

        this.canUploadOrDeleteFiles =
            this.authService.GetUser().role_name === 'Master' ? true : false;
    }

    ngOnInit(): void {
        this.projetosControl.disable();

        this.documentsService.getClientProjectFilters().subscribe((res) => {
            this.clientes = res;
        });

        this.cliente$.subscribe((res) => {
            this.getFiles(res.id);

            this.projetos = res.projects;
            this.projetosControl = new FormControl([]);
        });
    }

    getFiles(id = 'all') {
        const token = JSON.parse(localStorage.getItem('token'));
        const decoded = jwtDecode(token) as any;
        this.documentsService.getFiles(id).subscribe((res) => {
            if (this.router.url.includes('administrador/documentos')) {
                this.files = res.filter((f) => {
                    return f.projects.find((p) => decoded.projects.includes(p));
                });
            } else {
                this.files = res;
            }
            return this.updateDataSource([
                ...this.files,
                ...this.formData.getAll('files'),
            ]);
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
        console.log(e, cliente);

        if (cliente?.tenant_name === e) return;

        this.setContextoCliente(this.clientes.find((c) => c.tenant_name === e));
    }

    public setContextoCliente(novoContexto: any): void {
        this.projetosControl.enable();
        this.clienteSubject.next(novoContexto);
    }

    UploadFiles() {
        const cliente = this.clienteSubject.getValue();
        if (
            this.formData.get('files') === null ||
            this.formData.get('files')?.length
        ) {
            this.toastr.error('Nenhum arquivo selecionado');
            return;
        }
        if (cliente.id && this.projetosControl.value.length) {

            const file: any = this.formData.get('files')
            this.formData.set('files', file, this.form.get('name').value + '.' + this.form.get('extencion').value);

            this.documentsService
                .UploadFiles(
                    this.formData,
                    cliente.id,
                    this.projetosControl.value,
                    this.form.value.description
                )
                .subscribe(() => {
                    this.modalParams.data();
                });
        } else {
            this.toastr.error('Formulário inválido');
            this.projetosControl.markAllAsTouched();
            this.myControl.markAllAsTouched();
        }
    }
}
