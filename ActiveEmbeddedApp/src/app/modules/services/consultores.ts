import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultoresService {
  constructor(private http: HttpClient) { }

  getConsultores(): Observable<any> {
    return this.http.get<any>('https://web-raion-hml.herokuapp.com/api/consultores');
  }

  postConsultores(payload: any): Observable<any> {
    return this.http.post<any>('https://web-raion-hml.herokuapp.com/api/consultores', payload);
  }

  editarConsultores(payload: any, id: string): Observable<any> {
    return this.http.put<any>(`https://web-raion-hml.herokuapp.com/api/consultores/${id}`, payload);
  }

  deletarConsultores(id: string): Observable<any> {
    return this.http.delete<any>(`https://web-raion-hml.herokuapp.com/api/consultores/${id}`);
  }
}
