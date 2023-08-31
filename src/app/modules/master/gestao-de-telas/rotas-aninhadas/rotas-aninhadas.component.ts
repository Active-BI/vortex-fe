import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteModalComponent } from 'app/modules/admin/delete-modal/delete-modal.component';
import { PageMasterService } from 'app/modules/services/page-master.service';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { EdicaoCriacaoGrupoComponent } from '../modais/criacao-grupo/edicao-criacao-grupo.component';
import { DeletarRotaAninhadaComponent } from '../modais/deletar-rota-aninhada/deletar-rota-aninhada.component';

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
    selector: 'app-rotas-aninhadas',
    templateUrl: './rotas-aninhadas.component.html',
    styleUrls: ['./rotas-aninhadas.component.scss'],
})
export class RotasAninhadasComponent implements OnInit {
    myControl = new FormControl('');
    pipe = new DatePipe('en-US');
    panelOpenState = false;
    displayedColumns: string[] = ['nome', 'acesso', 'opcoes'];
    @ViewChild('paginator') paginator: MatPaginator;
    usuarios: MatTableDataSource<any>;
    usuariosL: number = 0;
    id = '';
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public fb: FormBuilder,
        private toastr: ToastrService,
        private pageMasterService: PageMasterService
    ) {
        this.id = this.route.snapshot.paramMap.get('id');

        this.requisicoes();
    }

    ngOnInit(): void {
        this.requisicoes();
    }
    form = this.fb.group({
        name: ['', Validators.required],
    });
    pages = [];
    pagesReduced = [];
    async requisicoes() {
        const acessos = agregarRoles(
            await this.pageMasterService.getPagesByGroup(this.id)
        );
        this.form.patchValue({
            name: acessos.page_group,
        });
        this.usuarios = new MatTableDataSource(acessos.children);
        this.usuariosFiltrados = new MatTableDataSource(acessos.children);
        this.usuariosFiltrados.paginator = this.paginator;
        this.usuarios.paginator = this.paginator;
        this.usuariosL = this.usuarios?.data.length;
    }
    usuariosFiltrados: MatTableDataSource<any>;
    filtarUsuarios(e) {
        const data = this.usuarios.data.filter((u) =>
            u.name.toUpperCase().includes(e.toUpperCase())
        );
        this.usuariosFiltrados = new MatTableDataSource(data);
        this.usuariosFiltrados.paginator = this.paginator;
    }
    AtualizarGrupo() {
        if (!this.form.valid) {
            this.toastr.error('Nome do grupo precisa ser preenchido');
            return;
        }
        this.pageMasterService
            .updateGroup({
                group_id: this.id,
                group_name: this.form.value.name,
            })
            .subscribe(
                (res) => {
                    this.toastr.success('Grupo Atualizado');
                },
                ({ error }) => {
                    this.toastr.error('Falha ao atualizar grupo');
                }
            );
    }

    AdicionarRota() {
        this.router.navigate([
            '/master/gestao/telas/criar-tela-aninhada/groupId/' + this.id,
        ]);
    }
    deletarRotaAninhada(page_id): void {
        this.dialog.open(DeletarRotaAninhadaComponent, {
            data: {
                data: () => {
                    this.dialog.closeAll();
                    this.pageMasterService
                        .deleteChildrenPage(page_id)
                        .subscribe(
                            () => {
                                this.toastr.success('Rota excluída');
                                this.requisicoes();
                            },
                            ({ error }) => {
                                this.toastr.error('Falha ao excluir rota');
                            }
                        );
                },
            },
        });
    }

    voltar(): void {
        this.router.navigate([`/master/gestao/telas`]);
    }
}
