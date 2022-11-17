import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
    matricula: string;
    nome: string;
    perfil: string;
    area: string;
  }

  const ELEMENT_DATA: PeriodicElement[] = [
    {matricula: '176565', nome: 'João Silva', perfil: 'User', area: 'Comercial'},
    {matricula: '1053433', nome: 'Rodrigo Nunes', perfil: 'Admin', area: 'Administrativo'},
    {matricula: '10078', nome: 'Carlos Alberto Saihd', perfil: 'User', area: 'Projetos'},
  ];

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
    displayedColumns: string[] = ['matricula', 'nome', 'perfil', 'area', 'opcoes'];
    dataSource = ELEMENT_DATA;
    constructor() {}

    ngOnInit(): void {}
}
