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


describe('Testando Páginas de usuários', () => {
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
  
  describe(' ', () => {

    it(' ', () => {

    });
  })
});