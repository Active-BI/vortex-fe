import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageService } from 'app/modules/services/page.service';
import { PMIService } from 'app/modules/services/PMI.service';
import { TelasService } from 'app/modules/services/telas.service';
import { Toast, ToastrService } from 'ngx-toastr';

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
    secondDisplayedColumns: string[] = [
        'nome',
        'grupo',
        'status',
        'ultima_atualizacao',
        'opt',
    ];

    pages: MatTableDataSource<any>;
    secondPage: MatTableDataSource<any>;

    constructor(
        private telasSrv: TelasService,
        private pageService: PageService,
        //private adminSrv: AdminService,
        public dialog: MatDialog,
        private pmiService: PMIService,
        private toastr: ToastrService
    ) {
        this.tenantId = localStorage.getItem('tenant_id');
    }

    ngOnInit(): void {
        this.requisicoes();
    }

    secontTable(pageId) {
        this.secondPage.filter = pageId.trim().toLowerCase();
    }

    requisicoes() {
        this.pageService.getDashboards().subscribe((e) => {
            const result = e
                .map((report) => ({
                    ...report.Page,
                    datasetInf: report.datasetInf,
                }))
                .filter((r) => r.page_type === 'report');
            console.log(result);
            this.secondPage = new MatTableDataSource(result);
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

    atualizarReport(report) {
        const group = report.link.split('/')[1];
        const _report = report.link.split('/')[2];

        this.pmiService.refreshDataset(group, _report).subscribe(
            (res) => {
                console.log(report);

                this.toastr.success('Relatorio sendo atualizado');
                this.requisicoes();
            },
            (error) => {
                this.toastr.error('Atualização em andamento');
                this.requisicoes();
            }
        );
    }

    pagesFiltrados: MatTableDataSource<any>;
}
