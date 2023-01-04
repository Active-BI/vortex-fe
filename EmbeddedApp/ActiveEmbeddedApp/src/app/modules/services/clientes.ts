import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User {
  email: string;
  password: string;
}

export interface UserRegister extends User {
  name: string;
  passwordConfirmation: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http: HttpClient) { }

  getClientes(): Observable<any> {
    return this.http.get<any>('https://web-raion-hml.herokuapp.com/api/clientes');
  }

  postCliente(payload: any): Observable<any> {
    return this.http.post('https://web-raion-hml.herokuapp.com/api/clientes', payload);
  }

  editCliente(payload: any, id: string): Observable<any> {
    return this.http.put(`https://web-raion-hml.herokuapp.com/api/clientes/${id}`, payload);
  }

  deleteClientes(id: string): Observable<any> {
    return this.http.delete<any>(`https://web-raion-hml.herokuapp.com/api/clientes/${id}`);
  }
}
