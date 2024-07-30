import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GlobalService {
    private _userRoutes$ = new BehaviorSubject<FuseNavigationItem[]>([]);
    private _userData$ = new BehaviorSubject<any>({});
    
    isMaster = false;

    get userData$() : Observable<any>  {
        return this._userData$
    }

    set userData(value: any) {
        value.role_name === 'Master' ? this.isMaster = true : this.isMaster = false;
        this._userData$.next(value);
    }
    
    get userRoute$()  {
        return this._userRoutes$
    }

    set userRoutes(value: FuseNavigationItem[]) {
        this._userRoutes$.next(value);
    }

    constructor() {}
}
