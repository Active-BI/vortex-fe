import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  constructor(private http: HttpClient) { }

  getEmpresas(): Observable<any> {
    return this.http.get<any>('https://web-raion-hml.herokuapp.com/api/empresas');
  }

  postEmpresas(payload: any): Observable<any> {
    return this.http.post<any>('https://web-raion-hml.herokuapp.com/api/empresas', payload);
  }

  editarEmpresas(payload: any, id: string): Observable<any> {
    return this.http.put<any>(`https://web-raion-hml.herokuapp.com/api/empresas/${id}`, payload);
  }

  deletarEmpresas(id: string): Observable<any> {
    return this.http.delete<any>(`https://web-raion-hml.herokuapp.com/api/empresas/${id}`);
  }
}
