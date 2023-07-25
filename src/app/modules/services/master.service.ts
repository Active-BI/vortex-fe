import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AdminRequestService {
    constructor(private http: HttpClient, private toast: ToastrService) {}

    private baseUrl = environment.baseUrl;

    tenants() {
        return this.http.get(`${this.baseUrl}tenants`);
    }

}
