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
    return this.http.get<any[]>(`${this.baseUrl}/admin`)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao consultar usuários`,null,{progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  geVisions(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/admin/visions`)
    .pipe(
      map((visions: Vision[]) => {
        return visions.sort((a, b) => {
          if(a.name.toUpperCase().includes('BRASIL')){
            return -1
          }
          else if (a.name.toUpperCase().includes('NACIONAL')){
            return -1
          }
          else if ( a.name < b.name){
            return - 1
          }
          else if(a.name > b.name){
            return 1
          }
          else {
            return 0
          }
        })
      } ),
      catchError((err) => {
        this.toast.error(`Erro ao obter visões`,null,{progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  geVisionById(id: string): Observable<Vision>{
    return this.http.get<Vision>(`${this.baseUrl}/admin/visions/${id}`)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao consultar visão`,null,{progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  DelVision(id: string): Observable<Vision> {
    return this.http.delete<Vision>(`${this.baseUrl}/admin/visions/${id}`)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao atualizar dados`, null, {progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  putVision(payload: Vision, id: string): Observable<Vision> {
    return this.http.put<Vision>(`${this.baseUrl}/admin/visions/${id}`, payload)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao atualizar dados`, null, {progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  postVision(payload: Vision): Observable<Vision> {
    return this.http.post<Vision>(`${this.baseUrl}/admin/visions`, payload)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao salvar dados`, null, {progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }
  getUserById(userId: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/admin/${userId}`)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao consultar usuário`,null,{progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  updateUser(user:any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/admin/user`,user)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao atualizar usuários`,null,{progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  preRegister(user:any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/admin`,user)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao pré-cadastrar usuário`,null,{progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  deleteUser(userId: string): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/admin?userId=${userId}`)
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

  getMenuItens(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/admin/menuitens`)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao obter dados`, null, {progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  postMenuItem(menuItem: IMenuItem): Observable<IMenuItem> {
    return this.http.post<IMenuItem>(`${this.baseUrl}/admin/menuitens`, menuItem)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao salvar dados`, null, {progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }
  getMenuItensById(id: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/admin/menuitens/${id}`)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao obter dados`, null, {progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  putMenuItem(payload: IMenuItem, id: string): Observable<IMenuItem> {
    return this.http.put<IMenuItem>(`${this.baseUrl}/admin/menuitens/${id}`, payload)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao atualizar dados`, null, {progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }

  DelMenuItem(id: string): Observable<any> {
    return this.http.delete<IMenuItem>(`${this.baseUrl}/admin/menuitens/${id}`)
    .pipe(
      catchError((err) => {
        this.toast.error(`Erro ao atualizar dados`, null, {progressBar:true, timeOut:2000});
        return throwError(err);
      })
    )
  }
}
