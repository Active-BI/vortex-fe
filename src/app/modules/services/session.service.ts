import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

export interface PreRegisterUpdate {
    id: string;
    name: string;
    email: string;
    tenant_id: string;
    identification: string;
    role_id: string;
}

@Injectable({ providedIn: 'root' })
export class SessionService {
    constructor(private http: HttpClient) {}
    private baseUrl = environment.baseUrl;

    getSessions(tenant_id): Observable<any> {
        return this.http.get<PreRegisterUpdate>(
            `${this.baseUrl}socket/` + tenant_id
        );
    }
    getAllSessions(tenant_id): Observable<any> {
        return this.http.get<PreRegisterUpdate>(
            `${this.baseUrl}socket/all/` + tenant_id
        );
    }
}
