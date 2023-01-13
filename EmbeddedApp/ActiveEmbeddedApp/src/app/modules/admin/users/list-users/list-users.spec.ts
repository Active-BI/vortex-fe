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
  })
});