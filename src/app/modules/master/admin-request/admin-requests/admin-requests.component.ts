import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'app/modules/admin/delete-modal/delete-modal.component';
import { AdminRequestService } from 'app/modules/services/admin-request.service';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AdminRequestConfirmationModalComponent } from '../admin-request-confirmation-modal/admin-request-confirmation-modal.component';
import { AdminRequestBlockModalComponent } from '../admin-request-block-modal/admin-request-block-modal.component';

@Component({
    selector: 'app-admin-requests',
    templateUrl: './admin-requests.component.html',
    styleUrls: ['./admin-requests.component.scss'],
})
export class AdminRequestsComponent implements OnInit {
    myControl = new FormControl('');
    pipe = new DatePipe('en-US');

    displayedColumns: string[] = [
        'nome',
        'company_name',
        'accept',
        'created_at',
        'opcoes',
    ];
    @ViewChild('paginator') paginator: MatPaginator;
    usuarios: MatTableDataSource<any>;
    usuariosL: number = 0;
    constructor(
        private router: Router,
        public dialog: MatDialog,
        private toastr: ToastrService,
        private adminRequestService: AdminRequestService
    ) {
        this.requisicoes();
    }

    ngOnInit(): void {
        this.requisicoes();
    }

    requisicoes() {
        this.adminRequestService.allAdminRequests().subscribe((e: any[]) => {
            e = e.map((a) => ({
                ...a,
                created_at: moment(a).format('DD/MM/YYYY'),
            }));
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
            u.name.toUpperCase().includes(e.toUpperCase())
        );
        this.usuariosFiltrados = new MatTableDataSource(data);
        this.usuariosFiltrados.paginator = this.paginator;
    }
    permitirUsuario(id, nome, element) {
        this.dialog.open(AdminRequestConfirmationModalComponent, {
            data: {
                nome: nome,
                user_data: element,
                criarTenant: (tenant) => {
                    this.dialog.closeAll();
                    this.adminRequestService
                        .allowAdminRequestsAndCreateTenant(id, tenant)
                        .subscribe(
                            () => {
                                this.toastr.success('Usuário Admin Criado');
                                this.requisicoes();
                            },
                            ({ error }) => {
                                this.toastr.error(error.message);
                            }
                        );
                },
                data: (tenantId) => {
                    this.dialog.closeAll();
                    this.adminRequestService
                        .allowAdminRequests(id, tenantId)
                        .subscribe(
                            () => {
                                this.toastr.success('Usuário Admin Criado');
                                this.requisicoes();
                            },
                            ({ error }) => {
                                console.log(error);
                                this.toastr.error(error.message);
                            }
                        );
                },
            },
        });
    }
    deletarUsuario(id): void {
        this.dialog.open(AdminRequestBlockModalComponent, {
            data: {
                nome: 'Usuários',
                data: () => {
                    this.dialog.closeAll();
                    this.adminRequestService
                        .blockAdminRequests(id)
                        .subscribe(() => {
                            this.toastr.success('Bloqueado com Sucesso');
                            this.requisicoes();
                        });
                },
            },
        });
    }

    criarUsuario(): void {
        this.router.navigate(['/master/gestao/solicitacoes-de-cadastro/criar']);
    }

    editarUsuario(id): void {
        this.router.navigate([
            `/master/gestao/solicitacoes-de-cadastro/editar` + id,
        ]);
    }
}
