import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    constructor(private http: HttpClient, private toast: ToastrService) {
        console.log('bbbbbbbbbbbbbbbb');
    }

    private baseUrl = environment.baseUrl;

    getMenus(): Observable<any> {
        const { userId }: any = jwtDecode(localStorage.getItem('token'));
        return this.http.get<any>(`${this.baseUrl}menu/${userId}`);
    }

    getAllMenus(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}menu`);
    }

    postMenus(payload): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}menu`, payload);
    }
}
