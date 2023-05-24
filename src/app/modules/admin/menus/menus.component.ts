import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
    AdminService,
    getAllRequest,
} from 'app/modules/services/admin.service';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { listRoles } from '../users/usersUtils';
import { MenuService } from 'app/modules/services/menu.service';

@Component({
    selector: 'app-menus',
    templateUrl: './menus.component.html',
    styleUrls: ['./menus.component.scss'],
})
export class MenusComponent implements OnInit {
    myControl = new FormControl('');
    pipe = new DatePipe('en-US');

    displayedColumns: string[] = [
        'nome',
        'identificacao',
        'perfil',
        'ultimoAcesso',
        'opcoes',
    ];
    @ViewChild('paginator') paginator: MatPaginator;
    usuarios: MatTableDataSource<any>;
    usuariosL: number = 0;
    constructor(
        private router: Router,
        private menuService: MenuService,
        public dialog: MatDialog,
        private toastr: ToastrService
    ) {
        this.requisicoes();
    }

    ngOnInit(): void {
        this.requisicoes();
    }
    requisicoes() {
        this.menuService.getAllMenus().subscribe((e) => {
            // const users = e.map((preRegister) => ({
            //     ...preRegister,
            //     perfil: listRoles.find(
            //         (role) => preRegister.role_id === role.id
            //     ).name,
            //     dataUltimoAcesso:
            //         preRegister.User !== null
            //             ? moment(preRegister.User.last_access).format(
            //                   'DD/MM/YY'
            //               )
            //             : 'N/',
            // }));
            this.usuarios = new MatTableDataSource(e);
            this.usuariosFiltrados = new MatTableDataSource(e);
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
    deletarUsuario(id): void {
        // this.dialog.open(DeleteModalComponent, {
        //     data: {
        //         nome: 'Usuários',
        //         data: () => {
        //             this.dialog.closeAll();
        //             this.adminSrv.deleteUser(id).subscribe(() => {
        //                 this.toastr.success('Deletado com Sucesso');
        //                 this.requisicoes();
        //             });
        //         },
        //     },
        // });
    }

    criarUsuario(): void {
        this.router.navigate(['app/usuarios-criar']);
    }
    editarUsuario(id): void {
        this.router.navigate([`app/usuarios-editar/${id}`]);
    }
}
