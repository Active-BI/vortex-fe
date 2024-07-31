import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouterService } from './routeService';

@Injectable({
    providedIn: 'root',
})
export class GlobalService {
    private baseUrl = environment.baseUrl;
    private _userRoutes$ = new BehaviorSubject<FuseNavigationItem[]>([]);
    private _userData$ = new BehaviorSubject<any>({});
    
    isMaster = false;

    get userData$() : Observable<any>  {
        return this._userData$
    }

    set userData$(value: any) {
        value.role_name === 'Master' ? this.isMaster = true : this.isMaster = false;
        this._userData$.next(value);
    }
    
    get userRoute$()  {
        return this._userRoutes$
    }

    set userRoutes(value: FuseNavigationItem[]) {
        this._userRoutes$.next(value);
    }

    private getNewRoutes() {
        return this.http.get(`${this.baseUrl}app-setup/routes`).subscribe((grupos: any[]) => {
            this.userRoutes = this.routerService.gerarRotasDaAplicacao(grupos)
        });
    }
    
    constructor(private http: HttpClient, private routerService: RouterService) {
        this.getNewRoutes()
    }
}
