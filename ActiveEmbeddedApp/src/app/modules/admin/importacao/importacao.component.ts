import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BasePrecoRealizado } from 'app/modules/services/base-preco-realizado';
import { ToastrService } from 'ngx-toastr';
import { convertDateForImport, isValidData } from './utils';
declare let require: any;
const xlsx = require('xlsx');

@Component({
    selector: 'app-importacao',
    templateUrl: './importacao.component.html',
    styleUrls: ['./importacao.component.scss'],
})
export class ImportacaoComponent {
    @ViewChild('paginator') paginator: MatPaginator;
    historico: any = [];
    fileName;
    displayedColumns: string[] = [
        'bairroDestComprador',
        'bairroEmitente',
        'cepDestComprador',
        'codProduto',
    ];
    c: any = [];
    constructor(
        public basePrecoRealizado: BasePrecoRealizado,
        private toastr: ToastrService
    ) {}

    handleConvertXlsx = (e: any): any => {
        e.preventDefault();
        const fileName = e.target.files[0]?.name;
        this.fileName = fileName;
        const reader: FileReader = new FileReader();
        reader.onload = (): void => {
            if (!fileName.endsWith('.xlsx')) {
                this.toastr.success('EXTENÇÃO INVÁLIDA');
                this.cancelar();
                return;
            }
            const data = reader.result;
            const workbook = xlsx.read(data, {
                type: 'array',
                cellDates: true,
            });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            let json = xlsx.utils.sheet_to_json(worksheet, { defval: '' });
            if (!isValidData(json)) {
                this.toastr.error('ARQUIVO COM CAMPOS INVALIDOS');
                this.cancelar();
                return;
            }
            try {
                json = convertDateForImport(json);
                this.historico = new MatTableDataSource(json);
                this.historico.paginator = this.paginator;
                this.c = json;
                const table = document.getElementById('table');
                table.classList.remove('hidden');
            } catch (error) {
                this.toastr.error('ERRO AO CONVERTER');

                this.cancelar();
            }
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    };
    changePage(event: PageEvent): void {
        this.paginator.pageIndex = event.pageIndex;
    }
    confirmar(): void {
        this.basePrecoRealizado.postBasePrecoRealizado(this.c).subscribe(() => {
            alert(this.c.length + ' linhas foram adicionadas');
            window.location.reload();
        });
    }

    cancelar(): void {
        const table = document.getElementById('table');
        table.classList.add('hidden');
        this.fileName = '';
        this.c = [];
        this.historico = [];
    }
}
