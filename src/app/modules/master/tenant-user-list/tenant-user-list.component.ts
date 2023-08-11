import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { getAllRequest } from 'app/modules/services/admin.service';
import { PageService } from 'app/modules/services/page.service';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AddAdminAccessComponent } from './add_access_admin/add_access_admin.component';

@Component({
    selector: 'app-tenant-user-list',
    templateUrl: './tenant-user-list.component.html',
    styleUrls: ['./tenant-user-list.component.scss'],
})
export class TenantUserListComponent implements OnInit {
    myControl = new FormControl('');
    id = '';
    @ViewChild('paginator') paginator: MatPaginator;
    usuarios: MatTableDataSource<getAllRequest>;
    usuariosL: number = 0;
    displayedColumns: string[] = [
        'nome',
        'perfil',
        'ultimoAcesso',
        'tenant',
        'opcoes',
    ];
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private pageService: PageService,
        private toastr: ToastrService,
        private dialog: MatDialog
    ) {
        this.id = this.route.snapshot.paramMap.get('id');
    }
    voltar() {
        this.router.navigate(['/master/gestao/tenants']);
    }
    ngOnInit(): void {
        this.requisicoes();
    }

    requisicoes() {
        this.pageService
            .getAdminUsersByTenantId(this.id)
            .subscribe((e: any[]) => {
                const users = e.map((usuario: any) => ({
                    ...usuario,
                    role_name: usuario.Rls.name,
                    tenant_name: usuario.Tenant.tenant_name,
                    dataUltimoAcesso:
                        usuario.last_access !== null
                            ? moment(usuario.last_access).format(
                                  'DD/MM/YY H:mm'
                              )
                            : 'N/',
                }));
                // .filter((user) => user.contact_email !== decoded.contact_email);
                this.usuarios = new MatTableDataSource(users);
                this.usuariosFiltrados = new MatTableDataSource(users);
                this.usuariosFiltrados.paginator = this.paginator;
                this.usuarios.paginator = this.paginator;
                this.usuariosL = this.usuarios?.data.length;
            });
    }
    usuariosFiltrados: MatTableDataSource<getAllRequest>;
    filtarUsuarios(e) {
        const data = this.usuarios.data.filter((u) =>
            u.name.toUpperCase().includes(e.toUpperCase())
        );
        this.usuariosFiltrados = new MatTableDataSource(data);
        this.usuariosFiltrados.paginator = this.paginator;
    }
    editarUsuario(usuario) {
        this.dialog.open(AddAdminAccessComponent, {
            data: {
                usuario,
                data: () => {
                    this.dialog.closeAll();
                    this.toastr.success('Editado com sucesso');
                    this.requisicoes();
                },
            },
        });
    }
}
