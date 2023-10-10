import {
    AfterViewInit,
    Component,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import {
    AdminService,
    getAllRequest,
} from 'app/modules/services/admin.service';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { listRoles } from '../usersUtils';
import moment from 'moment';
import jwtDecode from 'jwt-decode';

export interface PeriodicElement {
    id: string;
    email: string;
    emailContato: string;
    identificacao: string;
    nome: string;
    perfil: string;
    visoes: any[];
    menus: any[string];
}

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
    myControl = new FormControl('');
    pipe = new DatePipe('en-US');

    displayedColumns: string[] = [
        'nome',
        'identificacao',
        'perfil',
        'ultimoAcesso',
        'tenant',
        'opcoes',
    ];
    @ViewChild('paginator') paginator: MatPaginator;
    usuarios: MatTableDataSource<getAllRequest>;
    usuariosL: number = 0;
    constructor(
        private router: Router,
        private adminSrv: AdminService,
        public dialog: MatDialog,
        private toastr: ToastrService
    ) {
        this.requisicoes();
    }

    ngOnInit(): void {
        this.requisicoes();
    }
    requisicoes() {
        this.adminSrv.getUsers().subscribe((e) => {
            const users = e.map((usuario: any) => ({
                ...usuario,
                perfil: listRoles.find((role) => usuario.rls_id === role.id)
                    .name,
                dataUltimoAcesso:
                    usuario.User_Auth.last_access !== null
                        ? moment(usuario.User_Auth.last_access).format(
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
    reenviarEmail(user) {
        console.log(user);
        this.adminSrv
            .resendEmail({ email: user.contact_email, id: user.id })
            .subscribe(() => {
                this.toastr.success('Enviado com Sucesso');
                this.requisicoes();
            });
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
                    this.adminSrv.deleteUser(id).subscribe(() => {
                        this.toastr.success('Deletado com Sucesso');
                        this.requisicoes();
                    });
                },
            },
        });
    }

    criarUsuario(): void {
        this.router.navigate(['app/administrador/usuarios-criar']);
    }
    editarUsuario(id): void {
        this.router.navigate([`app/administrador/usuarios-editar/${id}`]);
    }
}
