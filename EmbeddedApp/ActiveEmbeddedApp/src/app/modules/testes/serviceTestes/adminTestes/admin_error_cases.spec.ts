import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AdminService } from 'app/modules/services/admin.service';
import { environment } from 'environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { errorCalback, requestError } from '../../testesUtils/adminTestesFuncsUtils';
import { getAllRequest, id, mockItem } from '../../testesUtils/adminTestesUtils';

describe('Testando casos de erro dos EndPoints de usuários - SERVICE', () => {
  let seuService: AdminService
  let httpMock: HttpTestingController;

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

  describe('Testa caso de erro do método Get de usuários', () => {
    it('deve lançar erro ao não buscar uma lista de usuários', () => {
      seuService
        .getUsers()
        .subscribe((e: getAllRequest[]) => () => {
        },
          (error) => errorCalback(error),
          () => {
          },
        );

      const request = httpMock.expectOne(`${baseUrl}admin`);

      requestError(request)
    });
  })

  describe('Testa caso de erro do método GetById de usuários', () => {
    it('deve lançar erro ao não buscar um usuário', () => {
      seuService
        .getUserById(id)
        .subscribe((e: getAllRequest[]) => () => {
        },
          (error) => errorCalback(error),
          () => {
          },
        );

      const request = httpMock.expectOne(`${baseUrl}admin/${id}`);

      requestError(request)

    });
  })

  describe('Testa caso de erro do método Put de usuários', () => {
    it('deve lançar erro ao não atualizar um usuário', () => {
      seuService
        .updateUser(mockItem)
        .subscribe((e: getAllRequest[]) => () => {
        },
          (error) => errorCalback(error),
          () => {
          },
        );
      const request = httpMock.expectOne(`${baseUrl}admin/user`);

      requestError(request)

    });
  })
  describe('Testa caso de erro do método Pré-registrar de usuários', () => {
    it('deve lançar erro ao não Pré-registrar um usuário', () => {
      seuService
        .preRegister(mockItem)
        .subscribe(() => () => {
        },
          (error) => {errorCalback(error)},
          () => {
          },
        );
      const request = httpMock.expectOne(`${baseUrl}admin`);

      requestError(request)

    });
  })
  describe('Testa caso de erro do método Delete de usuários', () => {
    it('deve lançar erro ao não deletar um usuário', () => {
      seuService
        .deleteUser(id)
        .subscribe((e: getAllRequest[]) => () => {
        },
          (error) => errorCalback(error),
          () => {
          },
        );
      const request = httpMock.expectOne(`${baseUrl}admin?userId=${id}`);
      requestError(request)
    });
  })
  describe('Testa caso de erro do método Get de visões', () => {
    it('deve lançar erro ao não deletar um usuário', () => {
      seuService
        .getVisions()
        .subscribe((e: getAllRequest[]) => () => {
        },
          (error) => errorCalback(error),
          () => {
          },
        );
      const request = httpMock.expectOne(`${baseUrl}visoes`);
      requestError(request)
    });
  })
});