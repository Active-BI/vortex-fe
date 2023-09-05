import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'app/modules/admin/delete-modal/delete-modal.component';
import { PageMasterService } from 'app/modules/services/page-master.service';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { EdicaoCriacaoGrupoComponent } from './modais/criacao-grupo/edicao-criacao-grupo.component';
import { DeletarGrupoComponent } from './modais/deletar-grupo/deletar-grupo.component';

function agregarRoles(objeto) {
    if (objeto.children) {
        const rolesSet = new Set(); // Usamos um Set para garantir roles únicas
        for (const child of objeto.children) {
            if (child.roles) {
                child.roles.forEach((role) => rolesSet.add(role));
            }
        }
        objeto.children_roles = Array.from(rolesSet).sort();
    }
    return objeto;
}

@Component({
    selector: 'app-gestao-de-telas',
    templateUrl: './gestao-de-telas.component.html',
    styleUrls: ['./gestao-de-telas.component.scss'],
})
export class GestaoDeTelasComponent implements OnInit {
    myControl = new FormControl('');
    pipe = new DatePipe('en-US');
    panelOpenState = false;
    displayedColumns: string[] = [
        'nome',
        'paginas',
        'acessos premitidos',
        'opcoes',
    ];
    @ViewChild('paginator') paginator: MatPaginator;
    usuarios: MatTableDataSource<any>;
    usuariosL: number = 0;
    constructor(
        private router: Router,
        public dialog: MatDialog,
        private toastr: ToastrService,
        private pageMasterService: PageMasterService
    ) {
        this.requisicoes();
    }

    ngOnInit(): void {
        this.requisicoes();
    }
    pages = [];
    pagesReduced = [];
    async requisicoes() {
        const acessos = (await this.pageMasterService.getPagesByGroup()).map(
            (objeto) => agregarRoles(objeto)
        );
        this.usuarios = new MatTableDataSource(acessos);
        this.usuariosFiltrados = new MatTableDataSource(acessos);
        this.usuariosFiltrados.paginator = this.paginator;
        this.usuarios.paginator = this.paginator;
        this.usuariosL = this.usuarios?.data.length;
    }
    usuariosFiltrados: MatTableDataSource<any>;
    filtarGrupos(e) {
        const data = this.usuarios.data.filter((u) =>
            u.page_group.toUpperCase().includes(e.toUpperCase())
        );
        this.usuariosFiltrados = new MatTableDataSource(data);
        this.usuariosFiltrados.paginator = this.paginator;
    }
    deletarGrupo(id, nome): void {
        this.dialog.open(DeletarGrupoComponent, {
            data: {
                nome,
                data: () => {
                    this.dialog.closeAll();
                    this.pageMasterService.deleteGroup(id).subscribe(
                        () => {
                            this.toastr.success('Grupo deletado');
                            this.requisicoes();
                        },
                        ({ error }) => {
                            this.toastr.error('Falha ao deletar grupo');
                        }
                    );
                },
            },
        });
    }
    criarGrupo(): void {
        this.dialog.open(EdicaoCriacaoGrupoComponent, {
            data: {
                nome: 'Usuários',
                data: () => {
                    this.dialog.closeAll();
                },
            },
        });
        // this.router.navigate(['/master/gestao/telas/grupo/criar']);
    }
    listarUsuarios(tenantId) {
        this.router.navigate([
            '/master/gestao/telas/' + tenantId + '/user/list',
        ]);
    }
    editarGrupo(id): void {
        this.router.navigate([`/master/gestao/telas/grupo/` + id]);
    }
}
