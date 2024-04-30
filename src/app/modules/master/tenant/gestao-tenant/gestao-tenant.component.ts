import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'app/modules/admin/delete-modal/delete-modal.component';
import { TenantsService } from 'app/modules/services/tenants.service';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import * as xlsx from 'xlsx';

@Component({
    selector: 'app-gestao-tenant',
    templateUrl: './gestao-tenant.component.html',
    styleUrls: ['./gestao-tenant.component.scss'],
})
export class GestaoTenantComponent implements OnInit {
    myControl = new FormControl('');
    pipe = new DatePipe('en-US');

    displayedColumns: string[] = ['nome', 'segmento', 'opcoes'];
    @ViewChild('paginator') paginator: MatPaginator;
    usuarios: MatTableDataSource<any>;
    usuariosL: number = 0;
    constructor(
        private router: Router,
        public dialog: MatDialog,
        private toastr: ToastrService,
        private tenantsService: TenantsService
    ) {
        this.requisicoes();
    }

    ngOnInit(): void {
        this.requisicoes();
    }
    requisicoes() {
        this.tenantsService.tenants().subscribe((e: any[]) => {
            this.usuarios = new MatTableDataSource(e);
            this.usuariosFiltrados = new MatTableDataSource(e);
            this.usuariosFiltrados.paginator = this.paginator;
            this.usuarios.paginator = this.paginator;
            this.usuariosL = this.usuarios?.data.length;
        });
    }
    usuariosFiltrados: MatTableDataSource<any>;
    filtarUsuarios(e) {
        const data = this.usuarios.data.filter((u) =>
            u.tenant_name.toUpperCase().includes(e.toUpperCase())
        );
        this.usuariosFiltrados = new MatTableDataSource(data);
        this.usuariosFiltrados.paginator = this.paginator;
    }
    deletarUsuario(id): void {
        const decoded: any = jwtDecode(localStorage.getItem('token'));
        if (decoded.userId === id) {
            this.toastr.error('Não é possível excluir usuário em uso');
            return;
        }
        this.dialog.open(DeleteModalComponent, {
            data: {
                nome: 'Usuários',
                data: () => {
                    this.dialog.closeAll();
                    this.tenantsService.removeTenant(id).subscribe(() => {
                        this.toastr.success('Desativado com Sucesso');
                        this.requisicoes();
                    });
                },
            },
        });
    }
    configs(): void {
        this.router.navigate(['/master/gestao/config']);
    }
    criarUsuario(): void {
        this.router.navigate(['/master/gestao/tenants/criar']);
    }
    listarUsuarios(tenantId) {
        this.router.navigate([
            '/master/gestao/tenants/' + tenantId + '/user/list',
        ]);
    }
    editarUsuario(id): void {
        this.router.navigate([`/master/gestao/tenants/editar/` + id]);
    }
    @ViewChild('formInputs') formInputs: ElementRef<HTMLInputElement>;
    selected = new FormControl('');
    dadosParaImportar = [];
    nomeArquivo = '';
    cleanFile() {
        if (this.dadosParaImportar.length > 0) {
            this.nomeArquivo = '';
            this.dadosParaImportar = [];

        }
    }
    Importar(e) {
        const reader: FileReader = new FileReader();

        this.cleanFile();
        const fileName = e.target.files[0]?.name as string;
        const file = e.target.files[0];
        if (Number((file.size / 1024).toFixed(2)) > 1500) {
            this.toastr.error('Excedeu tamanho máximo de 1,5 Mb');
            return;
        }

        reader.onload = (): void => {
            if (!fileName.endsWith('.xlsx')) {
                this.toastr.error('Extensão inválida');
                return;
            }
            this.nomeArquivo = fileName.substring(0, 20) + '...';

            const data = reader.result;
            const workbook = xlsx.read(data, {
                type: 'array',
                cellDates: true,
            });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            let json = xlsx.utils.sheet_to_json(worksheet, {
                defval: undefined,
            });
            try {
                json = json.map(item => ({
                    id: (item['NOME DO PROJETO'] as String).slice(0,3),
                    projeto: item['NOME DO PROJETO'],
                    cliente: item['CLIENTE PRINCIPAL']
                }))
                this.dadosParaImportar = json;
                this.tenantsService.updateProjects(this.dadosParaImportar).subscribe(() => {
                    this.toastr.success('Upload Concluído');
                    this.requisicoes();
                });
            } catch (e) {
                this.toastr.error("Estrutura Inválida")
            }
        };
        reader.readAsArrayBuffer(e.target.files[0]);
        e.target.value = ''
    }
}
