import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UfsService {
  constructor(private http: HttpClient) { }

  getUfs(): Observable<any> {
    return this.http.get<any>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
  }
}
