import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TributosService {
  constructor(private http: HttpClient) { }

  getIcms(): Observable<any> {
    return this.http.get<any>('https://web-raion-hml.herokuapp.com/api/icms-historico');
  }

  postIcms(payload: any): Observable<any> {
    return this.http.post<any>('https://web-raion-hml.herokuapp.com/api/icms-historico', payload);
  }

  getPmpf(): Observable<any> {
    return this.http.get<any>('https://web-raion-hml.herokuapp.com/api/pmpf-historico');
  }

  postPmpf(payload: any): Observable<any> {
    return this.http.post<any>('https://web-raion-hml.herokuapp.com/api/pmpf-historico', payload);
  }

  getPis(): Observable<any> {
    return this.http.get<any>('https://web-raion-hml.herokuapp.com/api/pis-historico');
  }

  postPis(payload: any): Observable<any> {
    return this.http.post<any>('https://web-raion-hml.herokuapp.com/api/pis-historico', payload);
  }

  getCofins(): Observable<any> {
    return this.http.get<any>('https://web-raion-hml.herokuapp.com/api/cofins-historico');
  }

  postCofins(payload: any): Observable<any> {
    return this.http.post<any>('https://web-raion-hml.herokuapp.com/api/cofins-historico', payload);
  }

  getFcv(): Observable<any> {
    return this.http.get<any>('https://web-raion-hml.herokuapp.com/api/fcv-historico');
  }

  postFcv(payload: any): Observable<any> {
    return this.http.post<any>('https://web-raion-hml.herokuapp.com/api/fcv-historico', payload);
  }
}
