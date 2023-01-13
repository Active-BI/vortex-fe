import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'app/modules/services/admin.service';
import { environment } from 'environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';


describe('Testando EndPoints das Páginas de usuários', () => {
  let seuService: AdminService
  let httpMock: HttpTestingController;
  interface getAllRequest {
    id: string;
    email: string;
    emailContato: string;
    identificacao: string;
    nome: string;
    perfil: string;
    userVisions: any[] | null
    dataUltimoAcesso: string | null
  }
  interface ImockVision {name: string, id: string}
  const mockVision: ImockVision  = {name: 'teste', id: '1'}
  const mockItem: getAllRequest[] = [{
    id: '1',
    email: 'mockEmail@mock.com.br',
    emailContato: 'mockEmail@mock.com.br',
    identificacao: 'mock user',
    nome: 'mock',
    perfil: 'user',
    userVisions: [],
    dataUltimoAcesso: ''
  }]
  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot({
        positionClass: 'toast-bottom-right'
      })],
    });
    seuService = TestBed.get(AdminService);
    httpMock = TestBed.get(HttpTestingController);
  });
  
  describe('Testa método Get de usuários', () => {

    it('deve buscar uma lista de usuários', () => {
      seuService
        .getUsers()
        .subscribe((e: getAllRequest[]) => {
          expect(e.length).toEqual(1);
          expect(e[0].email).toEqual('mockEmail@mock.com.br');
        })
      const httpRequest = httpMock.expectOne(`${baseUrl}admin`);
      httpRequest.flush(mockItem);
    });
    it('Testa se o método e o endpoint estão corretos', () => {
      seuService
        .getUsers()
        .subscribe((response: getAllRequest[]) => { });

      const httpRequest = httpMock.expectOne(`${baseUrl}admin`);

      expect(httpRequest.request.method).toEqual('GET');
      expect(httpRequest.request.responseType).toEqual('json');

      httpRequest.flush(mockItem);
    })
  })
  describe('Testa método GetById de usuários', () => {

    it('deve buscar um único usuários', () => {
      seuService
        .getUserById('1')
        .subscribe((e: getAllRequest) => {
          expect(e.id).toEqual('1');
        })
      const httpRequest = httpMock.expectOne(`${baseUrl}admin/1`);
      httpRequest.flush(mockItem[0]);
    });
    it('Testa se o método e o endpoint estão corretos', () => {
      seuService
        .getUserById('1')
        .subscribe((response: getAllRequest[]) => { });

      const httpRequest = httpMock.expectOne(`${baseUrl}admin/1`);

      expect(httpRequest.request.method).toEqual('GET');
      expect(httpRequest.request.responseType).toEqual('json');
      httpRequest.flush(mockItem[0]);
    })
  })


  describe('Testa método Put de usuários', () => {
    it('Se payload e Url estão corretos', () => {
      seuService
        .updateUser(mockItem)
        .subscribe(() => { })
      const httpRequest = httpMock.expectOne(`${baseUrl}admin/user`);

      expect(httpRequest.request.method).toEqual('PUT');
      expect(httpRequest.request.body).toEqual(mockItem);
    });
  })
  describe('Testa método de Pré-registrar de usuários', () => {
    it('Se payload e Url estão corretos', () => {
      seuService
        .preRegister(mockItem[0])
        .subscribe(() => { })
      
        const httpRequest = httpMock.expectOne(`${baseUrl}admin`);

      expect(httpRequest.request.method).toEqual('POST');
      expect(httpRequest.request.body).toEqual(mockItem[0]);
    });
  })

  describe('Testa método Get de Visões', () => {

    it('deve buscar uma lista de Visões', () => {
      seuService
        .geVisions()
        .subscribe((e: ImockVision[]) => {
          expect(e.length).toEqual(1);
          expect(e[0].name).toEqual('teste');
        })
      const httpRequest = httpMock.expectOne(`${baseUrl}visoes`);
      httpRequest.flush([mockVision]);
    });
    it('Testa se o método e o endpoint estão corretos', () => {
      seuService
        .geVisions()
        .subscribe((response: ImockVision[]) => {
         });

      const httpRequest = httpMock.expectOne(`${baseUrl}visoes`);

      expect(httpRequest.request.method).toEqual('GET');
      expect(httpRequest.request.responseType).toEqual('json');

      httpRequest.flush([mockVision]);
    })
  })
});