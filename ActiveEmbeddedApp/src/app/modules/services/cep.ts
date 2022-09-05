import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  constructor(private http: HttpClient) { }

  getCep(cep: string): Observable<any> {
    return this.http.get<any>(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  }
}
