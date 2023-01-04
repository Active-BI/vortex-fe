import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BasePrecoRealizado {
  constructor(private http: HttpClient) {}

  postBasePrecoRealizado(payload: any): Observable<any> {
    return this.http.post<any>('https://web-raion-hml.herokuapp.com/api/base-preco-realizado', payload);
  }
}
