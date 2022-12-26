import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'app/modules/services/usuarios';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'app/modules/services/admin.service';
import { MenuService } from 'app/modules/services/menu.service';

export interface PeriodicElement {
  id: string;
  email: string;
  emailContato: string;
  identificacao: string;
  nome: string;
  perfil: string;
  visoes: any[]
  menus: any[string]
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements AfterViewInit, OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

  displayedColumns: string[] = ['nome', 'identificacao', 'perfil', 'opcoes'];
  usuarios: MatTableDataSource<PeriodicElement>
  usuariosL: number = 0
  id = ''
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private adminSrv: AdminService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngAfterViewInit(): void {
    this.requisicoes()
  }

  ngOnInit(): void {
    this.requisicoes()
  }
  requisicoes() {
    this.adminSrv.getUsers().subscribe(e => {
      this.usuarios = new MatTableDataSource(e);
      this.usuarios.paginator = this.paginator;
      this.usuariosL = this.usuarios?.data.length;

    } )

  }
  deletarUsuario(matricula): void {
    this.dialog.open(DeleteModalComponent, {
      data: { 
        nome: "Usuários",
        data: () => {
        this.usuariosService.deleteUsuario(matricula)
        this.dialog.closeAll()
        this.toastr.success("Deletado com Sucesso")
        this.requisicoes()
        }
      },
  });
  }

  criarUsuario(): void {
    this.router.navigate(['/usuarios-criar'], {
      relativeTo: this.route,
    })
    this.requisicoes()

  }
  editarUsuario(id): void {
    this.router.navigate([`app/usuarios-editar/${id}`])
  }
}
