import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeriodicElement } from '../admin/users/list-users/list-users.component';

export interface User {
  email: string;
  password: string;
}

export interface UserRegister extends User {
  name: string;
  passwordConfirmation: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { matricula: '176565', nome: 'João Silva', perfil: 'User', area: 'Comercial', visoes: [] },
  { matricula: '1053433', nome: 'Rodrigo Nunes', perfil: 'Admin', area: 'Administrativo', visoes: [] },
  { matricula: '10078', nome: 'Carlos Alberto Saihd', perfil: 'User', area: 'Projetos', visoes: [] },
];

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private http: HttpClient) { }

  getUsuario(): PeriodicElement[] {
    if (!localStorage.getItem("defaultUsers")) {
      localStorage.setItem("defaultUsers", JSON.stringify(ELEMENT_DATA))
      return ELEMENT_DATA
    } else {
      return JSON.parse(localStorage.getItem("defaultUsers")) as PeriodicElement[]
    }
  }

  postUsuario(payload: PeriodicElement): any {
  }

  editUsuario(payload: PeriodicElement, matricula: string): any {
    const dataSource = this.getUsuario()
    const index = dataSource.findIndex((user: PeriodicElement) => user.matricula === matricula)
    dataSource[index] = payload
    localStorage.setItem('defaultUsers', JSON.stringify(dataSource))
  }

  deleteUsuario(matricula: string): any {
    const dataSource = this.getUsuario()
    const index = dataSource.findIndex((user: PeriodicElement) => user.matricula === matricula)
    dataSource.splice(index, 1)
    localStorage.setItem("defaultUsers", JSON.stringify(dataSource))
    location.reload()
  }
}
