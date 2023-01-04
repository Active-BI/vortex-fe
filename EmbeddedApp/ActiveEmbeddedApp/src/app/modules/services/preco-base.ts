import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PesoBaseService {
  constructor(private http: HttpClient) { }

  getPesoMistura(): Observable<any> {
    return this.http.get<any>('https://web-raion-hml.herokuapp.com/api/peso-mistura-historico');
  }

  postPesoMistura(payload: any): Observable<any> {
    return this.http.post<any>('https://web-raion-hml.herokuapp.com/api/peso-mistura-historico', payload);
  }

  getPrecoRefinaria(): Observable<any> {
    return this.http.get<any>('https://web-raion-hml.herokuapp.com/api/preco-refinaria-historico');
  }

  postPrecoRefinaria(payload: any): Observable<any> {
    return this.http.post<any>('https://web-raion-hml.herokuapp.com/api/preco-refinaria-historico', payload);
  }

  getPrecoBiodiesel(): Observable<any> {
    return this.http.get<any>('https://web-raion-hml.herokuapp.com/api/preco-biodisel-historico');
  }
  postPrecoBiodiesel(payload: any): Observable<any> {
    return this.http.post<any>('https://web-raion-hml.herokuapp.com/api/preco-biodisel-historico', payload);
  }
}
