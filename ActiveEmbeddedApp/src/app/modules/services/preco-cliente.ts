import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrecoCliente {
  constructor(private http: HttpClient) {}

  getPrecoCliente(payload: any): Observable<any> {
    return this.http.get<any>(
      `https://web-raion-hml.herokuapp.com/api/preco-cliente?offset=0&limit=100&idCliente=${
        payload.cliente_id
      }&nomeGaragem=${
        payload.garagem
      }&idProduto=${
        payload.produto_id
      }&fornecedor=${
        payload.fornecedor
      }`
    );
  }

  postPrecoCliente(payload: any): Observable<any> {
    return this.http.post<any>('https://web-raion-hml.herokuapp.com/api/preco-cliente', payload);
  }
}
