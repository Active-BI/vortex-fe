import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'app/modules/services/usuarios';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  matricula: string;
  nome: string;
  perfil: string;
  area: string;
  visoes: any[]
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements AfterViewInit, OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

  displayedColumns: string[] = ['matricula', 'nome', 'perfil', 'area', 'opcoes'];
  usuarios: MatTableDataSource<PeriodicElement>
  usuariosL: number = 0

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService
  ) {
  }

  ngAfterViewInit(): void {
    this.requisicoes()
  }

  ngOnInit(): void {
    this.requisicoes()
  }
  requisicoes() {
    const users = this.usuariosService.getUsuario()
    this.usuarios = new MatTableDataSource(users);
    this.usuarios.paginator = this.paginator;
    this.usuariosL = this.usuarios?.data.length;
  }
  deletarUsuario(matricula): void {
    this.usuariosService.deleteUsuario(matricula)
    this.requisicoes()
  }
  criarUsuario(): void {
    this.router.navigate(['../usuarios-criar'], {
      relativeTo: this.route,
    })
    this.requisicoes()

  }
  editarUsuario(matricula): void {
    this.router.navigate(['../usuarios-editar'], {
      relativeTo: this.route,
      queryParams: { matricula }
    });
    this.requisicoes()

  }
}
