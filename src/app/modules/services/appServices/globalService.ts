import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { environment } from 'environments/environment';
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
        if (JSON.stringify(value) !== JSON.stringify(this._userRoutes$.value)) {
            this._userRoutes$.next(value);
        }
    }

    getNewRoutes() {
        if (localStorage.getItem('rotas')) {
            this.userRoutes = JSON.parse(localStorage.getItem('rotas'))
        } 

        this.http.get(`${this.baseUrl}app-setup/routes`).subscribe((grupos: any[]) => {
            const rotas = this.routerService.gerarRotasDaAplicacao(grupos)
            this.userRoutes = rotas
        });
    }
    
    constructor(private http: HttpClient, private routerService: RouterService) {
    }
}
