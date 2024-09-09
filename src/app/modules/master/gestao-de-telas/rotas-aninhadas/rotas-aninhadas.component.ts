import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMasterService } from 'app/modules/services/page-master.service';
import { ToastrService } from 'ngx-toastr';
import { DeletarRotaAninhadaComponent } from '../modais/deletar-rota-aninhada/deletar-rota-aninhada.component';
import { GroupMasterService } from 'app/modules/services/group-master.service';
import { PMIService } from 'app/modules/services/PMI.service';
import { ShowIconsComponent } from './show-icons/show-icons.component';
import { DataStorageService } from 'app/modules/services/data-storage.service';

export function agregarRoles(objeto) {
    if (objeto?.children) {
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
    displayedColumns: string[] = [
        'nome',
        'tipo',
        'acesso',
        'status',
        'ultima_atualizacao',
        'opcoes',
    ];
    @ViewChild('paginator') paginator: MatPaginator;
    usuarios: MatTableDataSource<any>;
    usuariosL: number = 0;
    usuariosFiltrados: MatTableDataSource<any>;

    id = '';
    icones = [];
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public fb: FormBuilder,
        private toastr: ToastrService,
        private pageMasterService: PageMasterService,
        private groupMasterService: GroupMasterService,
        private pmiService: PMIService,
        private storageSrv: DataStorageService,
    ) {
        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.requisicoes();
    }
    form = this.fb.group({
        name: ['', Validators.required],
        icon: ['', Validators.required],
    });
    pages = [];
    pagesReduced = [];
    async requisicoes() {
        this.storageSrv.storageMasterGroup(this.id).subscribe((res) => {
            console.log(res.children);
            this.form.patchValue({
                name: res.page_group,
                icon: res.icon,
            });
            this.usuarios = new MatTableDataSource(res.children);
            this.usuariosFiltrados = new MatTableDataSource(res.children);
            this.usuariosFiltrados.paginator = this.paginator;
            this.usuarios.paginator = this.paginator;
            this.usuariosL = this.usuarios?.data.length;
            this.pmiService
                .getMasterGroupDataSetInfo(res.children)
                .subscribe((e) => {
                    console.log(e);
                    this.usuariosFiltrados = new MatTableDataSource(e);
                    this.usuariosFiltrados.paginator = this.paginator;
                    this.usuarios = new MatTableDataSource(res.children);
                    this.usuarios.paginator = this.paginator;

                    this.usuariosL = this.usuarios?.data.length;
                });
        });

        // const acessos = agregarRoles(
        //     await this.groupMasterService.getGroup(this.id),
        // );
        // console.log(acessos);
        // this.form.patchValue({
        //     name: acessos.page_group,
        //     icon: acessos.icon,
        // });
        // this.usuarios = new MatTableDataSource(acessos.children);
        // this.usuariosFiltrados = new MatTableDataSource(acessos.children);
        // this.usuariosFiltrados.paginator = this.paginator;
        // this.usuarios.paginator = this.paginator;
        // this.usuariosL = this.usuarios?.data.length;
    }
    filtarUsuarios(e) {
        const data = this.usuarios.data.filter((u) =>
            u.name.toUpperCase().includes(e.toUpperCase()),
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
            .updateGroup(this.id, {
                id: this.id,
                title: this.form.value.name,
                icon: this.form.value.icon,
            })
            .subscribe(
                (res) => {
                    this.toastr.success('Grupo Atualizado');
                },
                ({ error }) => {
                    this.toastr.error('Falha ao atualizar grupo');
                },
            );
    }

    AdicionarRota() {
        this.router.navigate([
            '/master/gestao/telas/criar-tela-aninhada/groupId/' + this.id,
        ]);
    }

    EditarRota(id) {
        this.router.navigate([
            '/master/gestao/telas/editar-tela-aninhada/groupId/' +
                this.id +
                '/screenId/' +
                id,
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
                            },
                        );
                },
            },
        });
    }

    atualizarReport(report) {
        const group = report.link.split('/')[1];
        const _report = report.link.split('/')[2];

        this.pmiService.refreshDataset(group, _report).subscribe(
            (res) => {
                this.toastr.success('Relatorio sendo atualizado');
                this.requisicoes();
            },
            (error) => this.toastr.error('Atualização em andamento'),
        );
    }
    voltar(): void {
        this.router.navigate([`/master/gestao/telas`]);
    }

    showIcons() {
        this.dialog
            .open(ShowIconsComponent, {
                data: {
                    data: () => {
                        this.toastr.success('Editado com sucesso');
                        this.dialog.closeAll();
                    },
                },
            })
            .afterClosed()
            .subscribe((icon) => {
                console.log(this.form);
                this.form.patchValue({ icon: icon });
            });
    }
}
