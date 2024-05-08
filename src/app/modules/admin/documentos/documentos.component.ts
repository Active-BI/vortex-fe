import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'app/modules/services/auth/auth.service';
import { DocumentsService } from 'app/modules/services/documents.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import saveAs from 'file-saver';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { TenantsService } from 'app/modules/services/tenants.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  files = []
  canUploadOrDeleteFiles
  displayedColumns: string[] = ['name', 'projects','created_at', 'opt'];
  constructor(
    private documentsService: DocumentsService,
    private authService: AuthService,
    private tenantsService: TenantsService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
    this.canUploadOrDeleteFiles = this.authService.GetUser().role_name === 'Master' ? true : false
  }
  formData = new FormData()
  ngOnInit(): void {
    this.projetosControl.disable()

    this.documentsService.getClientProjectFilters().subscribe(res => {
      this.clientes = res
    })

    this.cliente$.subscribe(res => {
      this.getFiles(res.id)
      this.projetos = res.projects
      this.projetosControl = new FormControl([]);
    })

    if (this.router.url.includes('administrador/documentos')) {
      const token = JSON.parse(localStorage.getItem('token'))
      const decoded = jwtDecode(token) as any
      this.tenantsService.getProjects(decoded.tenant_name).subscribe({
          next: (value: any[]) => {
              this.projetos =(value as string[]).filter((v: any) => decoded.projects.includes(v.id))
          },
          error: (error: any) => {
              console.log(error);
          },
      });
    }
  }

  onFileSelected(event) {
    const files = event.target.files;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.formData.append('files', files[i]);
      }
      return this.updateDataSource([...this.files, ...this.formData.getAll('files')])
    }
  }
  deleteCommitedFile(file_id) {
    const cliente = this.clienteSubject.getValue()

    this.documentsService.DeleteFile(file_id).subscribe(() => {
      this.getFiles(cliente.id ? cliente.id : 'all')
    })
  }
  UploadFiles() {
    const cliente = this.clienteSubject.getValue()
    if (this.formData.get('files') === null || this.formData.get('files')?.length) {
      this.toastr.error('Nenhum arquivo selecionado')
      return
    }
    if (cliente.id && this.projetosControl.value.length) {

      this.documentsService.UploadFiles(this.formData, cliente.id,this.projetosControl.value).subscribe(res => {
        this.formData = new FormData()
        const cliente = this.clienteSubject.getValue()
        console.log(cliente)
        this.getFiles(cliente.id)
      })
    } else {
      this.toastr.error('Formulário inválido')
      this.projetosControl.markAllAsTouched()
      this.myControl.markAllAsTouched()
    }
  }
  downloadFile(file) {
    this.documentsService.DownloadFile(file.id).subscribe(res => {
      const blob = new Blob([res], { type: 'application/octet-stream' });

      saveAs(blob, file.name + '.' + file.file_format);
    })

  }
  deleteFromFormData(name: string) {
    const novoFormData = new FormData();
    for (const file of this.formData.getAll('files')) {
      if ((file as any).name !== name) {
        novoFormData.append('files', file);
      }
    }
    this.formData = novoFormData;
    return this.updateDataSource([...this.files, ...this.formData.getAll('files')])
  }

  updateDataSource(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    return this.dataSource
  }
  clientes = []
  cliente
  projetos = []
  myControl = new FormControl('', [Validators.required]);
  projetosControl = new FormControl([], [Validators.required, Validators.minLength(1)]);

  getFiles(id = 'all') {
    this.documentsService.getFiles(id).subscribe(res => {
      this.files = res
      return this.updateDataSource([...res, ...this.formData.getAll('files')])
    })
  }



  clienteSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public cliente$: Observable<any> = this.clienteSubject.asObservable();

  public setContextoCliente(novoContexto: any): void {
    this.projetosControl.enable()
      this.clienteSubject.next(novoContexto);
  }
  clearSelection() {
    this.myControl.setValue('')
    this.projetosControl.disable()
    this.getFiles()
    this.setContextoCliente({});
    return

  }
  setProjects(e){
    const cliente = this.clienteSubject.getValue()
    
    if (cliente?.tenant_name === e) return
    
    this.setContextoCliente(this.clientes.find(c => c.tenant_name === e))
  }
}
