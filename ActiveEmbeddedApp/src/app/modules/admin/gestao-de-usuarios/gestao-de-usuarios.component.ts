import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    Dialog,
    PaginaSimples,
} from 'app/modules/services/abstractPages/abstractPage';
import { ConsultoresService } from 'app/modules/services/consultores';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from 'app/modules/services/clientes';
import { CepService } from 'app/modules/services/cep';
import { EmpresasService } from 'app/modules/services/empresas';
import { UfsService } from 'app/modules/services/ufs';
import _ from 'lodash';

@Component({
  selector: 'app-gestao-de-usuarios',
  templateUrl: './gestao-de-usuarios.component.html',
  styleUrls: ['./gestao-de-usuarios.component.scss']
})
export class GestaoDeUsuariosComponent extends PaginaSimples implements OnInit  {
  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['nome', 'cnpj', 'uf', 'createdAt', 'id'];
  public clientes: any = [];
  public cliente: any;
  constructor(
      public dialog: MatDialog,
      private clienteService: ClienteService
  ) {
      super();
  }

  ngOnInit(): void {
      this.clienteService.getClientes().subscribe((res: any) => {
          this.clientes = new MatTableDataSource(res.data);
          this.clientes.paginator = this.paginator;
      });
  }

  deletar(id: string): void {
      this.dialog.open(DeleteModalComponent, {
          data: () =>
              this.clienteService.deleteClientes(id).subscribe(() => {
                  window.location.reload();
              }),
      });
  }
  dialogoEdicao(cliente: any): void {
      this.cliente = cliente;

  }
  dialogoCriacao(): void {

  }
}


