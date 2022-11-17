import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'app/modules/services/usuarios';

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
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['matricula', 'nome', 'perfil', 'area', 'opcoes'];
  dataSource = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService
  ) {
    this.dataSource = this.usuariosService.getUsuario()
  }

  ngOnInit(): void { }
  deletarUsuario(matricula): void {
    this.usuariosService.deleteUsuario(matricula)
  }
  criarUsuario(): void {
    this.router.navigate(['../usuarios-criar'], {
      relativeTo: this.route,
    })
  }
  editarUsuario(matricula): void {
    this.router.navigate(['../usuarios-editar'], {
      relativeTo: this.route,
      queryParams: { matricula }
    });
  }
}
