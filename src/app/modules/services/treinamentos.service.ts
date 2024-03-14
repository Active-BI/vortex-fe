import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TreinamentoService {
    constructor(private http: HttpClient) {}
    private baseUrl = environment.baseUrl;

    getTreinamentos(playlistId): Observable<any> {
        return this.http.get(`${this.baseUrl}treinamentos/${playlistId}`);
    }
}
