import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'app/modules/services/auth/auth.service';
import { DocumentsService } from 'app/modules/services/documents.service';
import { ToastrService } from 'ngx-toastr';
import saveAs from 'file-saver';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddDocumentosComponent } from './add-documentos/add-documentos.component';
import { getAllRequest } from 'app/modules/services/user.service';

@Component({
    selector: 'app-documentos',
    templateUrl: './documentos.component.html',
    styleUrls: ['./documentos.component.scss'],
})
export class DocumentosComponent implements OnInit {
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('fileInput') fileInput: ElementRef;

    files = [];
    canUploadOrDeleteFiles;
    docs = new MatTableDataSource<getAllRequest>();
    displayedColumns: string[] = [
        'tenant_name',
        'name',
        'format',
        'projects',
        'created_at',
        'opt',
    ];
    constructor(
        private documentsService: DocumentsService,
        private authService: AuthService,
        private toastr: ToastrService,
        private dialog: MatDialog
    ) {
        this.dataSource = new MatTableDataSource([]);

        this.canUploadOrDeleteFiles =
            this.authService.GetUser().role_name === 'Master' ? true : false;
    }

    formData = new FormData();

    getDocuments() {
        this.documentsService.getClientProjectFilters().subscribe((res) => {
            this.clientes = res;

            const files = [];
            res.forEach((v) =>
                files.push(
                    ...v.Tenant_files.map((obj) => {
                        return { ...obj, tenant_name: v.tenant_name };
                    })
                )
            );
            this.docs = new MatTableDataSource(files);
            this.updateDataSource(files);
        });
    }

    ngOnInit(): void {
        this.projetosControl.disable();
        this.getDocuments();
    }

    onFileSelected(event) {
        const files = event.target.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                this.formData.append('files', files[i]);
            }
            this.openModal(this.formData);
        }
    }

    deleteCommitedFile(file_id) {
        this.documentsService.DeleteFile(file_id).subscribe(() => {
            this.getDocuments();
        });
    }

    downloadFile(file) {
        this.documentsService.DownloadFile(file.id).subscribe((res) => {
            const blob = new Blob([res], { type: 'application/octet-stream' });
            saveAs(blob, file.name + '.' + file.file_format);
            this.toastr.success('Obtido com sucesso');
        });
    }

    deleteFromFormData(name: string) {
        const novoFormData = new FormData();
        for (const file of this.formData.getAll('files')) {
            if ((file as any).name !== name) {
                novoFormData.set('files', file);
            }
        }
        this.formData = novoFormData;
        return this.updateDataSource([
            ...this.files,
            ...this.formData.getAll('files'),
        ]);
    }

    updateDataSource(data) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        return this.dataSource;
    }

    clientes = [];
    projetos = [];
    myControl = new FormControl('');

    projetosControl = new FormControl(
        [],
        [Validators.required, Validators.minLength(1)]
    );

    openModal(files: FormData) {
        const modal = this.dialog.open(AddDocumentosComponent, {
            data: {
                files,
                data: () => {
                    this.toastr.success('Criado com sucesso');
                    this.getDocuments();
                    this.dialog.closeAll();
                },
            },
        });
        modal.afterClosed().subscribe({
            next: () => {
                this.formData = new FormData();
                this.fileInput.nativeElement.value = '';
            },
        });
    }
    filtrar(e) {
        const data = this.docs.data.filter((u) =>
            u.name.toUpperCase().includes(e.toUpperCase())
        );

        this.updateDataSource(data);
    }
}
