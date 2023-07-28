import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'app/modules/admin/delete-modal/delete-modal.component';
import { TenantsService } from 'app/modules/services/tenants.service';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-gestao-tenant',
    templateUrl: './gestao-tenant.component.html',
    styleUrls: ['./gestao-tenant.component.scss'],
})
export class GestaoTenantComponent implements OnInit {
    myControl = new FormControl('');
    pipe = new DatePipe('en-US');

    displayedColumns: string[] = ['nome', 'status', 'opcoes'];
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
}
