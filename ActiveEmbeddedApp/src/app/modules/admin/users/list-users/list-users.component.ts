import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface PeriodicElement {
  matricula: string;
  nome: string;
  perfil: string;
  area: string;
  visoes: any[]
}

const ELEMENT_DATA: PeriodicElement[] = [
  { matricula: '176565', nome: 'João Silva', perfil: 'User', area: 'Comercial', visoes: [] },
  { matricula: '1053433', nome: 'Rodrigo Nunes', perfil: 'Admin', area: 'Administrativo', visoes: [] },
  { matricula: '10078', nome: 'Carlos Alberto Saihd', perfil: 'User', area: 'Projetos', visoes: [] },
];

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
  ) {
    if (!localStorage.getItem("defaultUsers")) {
      localStorage.setItem("defaultUsers", JSON.stringify(ELEMENT_DATA))
      this.dataSource = ELEMENT_DATA
    } else {
      this.dataSource = JSON.parse(localStorage.getItem("defaultUsers"))
    }
  }

  ngOnInit(): void { }
  deletarUsuario(matricula): void {
    const index = this.dataSource.findIndex((user: PeriodicElement) => user.matricula === matricula)
    this.dataSource.splice(index, 1)
    localStorage.setItem("defaultUsers", JSON.stringify(this.dataSource))
    location.reload()
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
