import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseSupridora {
  constructor(private http: HttpClient) { }

  getBaseSupridora(): Observable<any> {
    return this.http.get<any>('https://web-raion-hml.herokuapp.com/api/base-supridoras');
  }
}
