import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtItils = new JwtHelperService()

  constructor() { }

  // userLoggedIn: string

  private _user: ReplaySubject<any> = new ReplaySubject<any>(1);

  set user(value: any)
  {
      // Store the value
      this._user.next(value);
  }

  get user$(): Observable<any>
  {
      return this._user.asObservable();
  }


  isLoggedIn(): boolean {
    
    const token = localStorage.getItem('token');
    if (!token) {
      return false
    }
    try {
      this.jwtItils.decodeToken(token);
      return true;
    } catch (Error) {
      localStorage.removeItem('token');
      // window.location.assign('/login')
      return false;
    }
  }
}
