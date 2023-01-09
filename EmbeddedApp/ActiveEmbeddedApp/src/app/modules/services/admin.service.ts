import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';

interface Vision{
  id: string
  name: string
}export interface IMenuItem {
  class: string,
  context: string,
  icon: string
  id: string
  longTitle: string
  menuSubItens: null | IMenuSubItens[]
  path: string
  title: string
}

export interface IPostMenuItem {
  class: string,
  context: string,
  icon: string
  longTitle: string
  menuSubItens: null | IMenuSubItens[]
  path: string
  title: string
}

export interface IMenuSubItens {
  class: string,
  context: string,
  icon: string
  id: string
  longTitle: string
  path: string
  title: string
  menuItemId: string
}

@Injectable({
  providedIn: 'root'
})


export class AdminService {

  constructor(private http: HttpClient,
              private toast: ToastrService ) { }

 private baseUrl = environment.baseUrl;

  getUsers(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}admin`)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao consultar usuários`,null,{progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  geVisions(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}visoes`)
    .pipe(
      map((visions: any[]) => {
        return visions.sort((a, b) => {
          a = a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
          b = b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          // a must be equal to b
          return 0;
        })
      } ),
      catchError((err) => {
        this.toast.error(`Erro ao obter visões`,null,{progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  getUserById(userId: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}admin/${userId}`)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao consultar usuário`,null,{progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  updateUser(user:any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}admin/user`,user)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao atualizar usuários`,null,{progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  preRegister(user:any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}admin`,user)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao pré-cadastrar usuário`,null,{progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  deleteUser(userId: string): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}admin?userId=${userId}`)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao remover usuário`,null,{progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }



  getMenuContext(): Observable<FuseNavigationItem[]>{
    return this.http.get<FuseNavigationItem[]>(`${this.baseUrl}admin/menucontext`)
    .pipe(
      debounceTime(500),
      catchError((err) => {
        this.toast.error(`Erro ao obter dados`, null, {progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

}
