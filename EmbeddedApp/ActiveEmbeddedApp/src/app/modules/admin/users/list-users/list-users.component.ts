import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'app/modules/services/admin.service';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
  myControl = new FormControl('');
  pipe = new DatePipe('en-US');

  displayedColumns: string[] = ['nome', 'identificacao', 'perfil', 'ultimoAcesso', 'opcoes'];
  usuarios: MatTableDataSource<PeriodicElement>
  usuariosL: number = 0
  constructor(
    private router: Router,
    private adminSrv: AdminService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) {
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
      this.usuariosFiltrados = new MatTableDataSource(e);
      this.usuariosFiltrados.paginator = this.paginator;
      this.usuarios.paginator = this.paginator;
      this.usuariosL = this.usuarios?.data.length;
    } )

  }
  usuariosFiltrados: MatTableDataSource<PeriodicElement>
  filtarUsuarios(e) {
    const data = this.usuarios.data.filter((u) => u.nome.toUpperCase().includes(e.toUpperCase()))
    this.usuariosFiltrados = new MatTableDataSource(data)
    this.usuariosFiltrados.paginator = this.paginator;
  }
  deletarUsuario(id): void {
    this.dialog.open(DeleteModalComponent, {
      data: { 
        nome: "Usuários",
        data: () => {
          this.dialog.closeAll()
        this.adminSrv.deleteUser(id).subscribe(() => {
          this.toastr.success("Deletado com Sucesso")
          this.requisicoes()
        })
        }
      },
  });
  }

  criarUsuario(): void {
    this.router.navigate(['app/usuarios-criar'])

  }
  editarUsuario(id): void {
    this.router.navigate([`app/usuarios-editar/${id}`])
  }
}
