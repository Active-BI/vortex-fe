import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'app/modules/services/auth/auth.service';
import { DocumentsService } from 'app/modules/services/documents.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

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
  displayedColumns: string[] = ['name', 'created_at', 'updated_by', 'opt'];
  constructor(
    private documentsService: DocumentsService,
    private authService: AuthService
  ) {
    this.dataSource = new MatTableDataSource([]);
    this.canUploadOrDeleteFiles = this.authService.GetUser().role_name === 'Master' ? true : false
  }
  formData = new FormData()

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
    this.documentsService.DeleteFile(file_id).subscribe(() => {
      this.getFiles();
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
  async getFiles() {
    await this.documentsService.getFiles().subscribe(res => {
      this.dataSource = res
    })
  }
  updateDataSource(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    return this.dataSource
  }
  ngOnInit(): void {
  }

}
