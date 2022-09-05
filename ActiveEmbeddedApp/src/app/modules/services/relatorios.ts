import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RelatoriosApi {
  constructor(private http: HttpClient) {}

  getVolumeConsumido(query: string): Observable<any> {
    return this.http.get<any>(
      `https://web-raion-hml.herokuapp.com/api/base-preco-realizado?${query}`
    );
  }
}
