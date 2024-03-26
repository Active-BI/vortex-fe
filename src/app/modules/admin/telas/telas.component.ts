import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TelasService } from 'app/modules/services/telas.service';

@Component({
    selector: 'app-telas',
    templateUrl: './telas.component.html',
    styleUrls: ['./telas.component.scss'],
})
export class TelasComponent {
    @ViewChild('paginator') paginator: MatPaginator;
    selectedPage = '';
    myPageControl = new FormControl('');
    tenantId = '';

    displayedColumns: string[] = ['nome'];
    secondDisplayedColumns: string[] = ['nome', 'email', 'relatorio'];

    pages: MatTableDataSource<any>;
    secondPage: MatTableDataSource<any>;

    constructor(
        private telasSrv: TelasService,
        //private adminSrv: AdminService,
        public dialog: MatDialog
    ) {
        this.tenantId = localStorage.getItem('tenant_id');
        this.requisicoes();
    }

    ngOnInit(): void {
        this.requisicoes();
    }

    secontTable(pageId) {
        this.secondPage.filter = pageId.trim().toLowerCase();
    }

    requisicoes() {
        this.telasSrv.getUserByPages().subscribe((e) => {
            this.secondPage = new MatTableDataSource(e);
            this.secondPage.paginator = this.paginator;
        });
    }
    exportarAcessos() {
        this.telasSrv.getUserByPagesExport().subscribe((data) => {
            const blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'acessos.xlsx';
            link.click();
        });
    }
    filtrarSegundaTabela(id) {
        const users = this.pages.data.find((p) => p.page_id === id).User_Page;
        this.secondPage = new MatTableDataSource(users);
    }
    pagesFiltrados: MatTableDataSource<any>;
}
