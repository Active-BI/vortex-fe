import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TelasService {
    constructor(private http: HttpClient) {}
    private baseUrl = environment.baseUrl;

    getUserByPages(): Observable<any> {
        return this.http.get(`${this.baseUrl}page/user/user-by-page`);
    }

    getUserByPagesExport(): Observable<any> {
        return this.http.get(`${this.baseUrl}page/user/user-by-page-export`, {
            responseType: 'blob',
        });
    }
}
