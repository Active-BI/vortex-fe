import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { OfficeService } from 'app/modules/services/office.service';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss']
})
export class OfficesComponent implements OnInit {
  myControl = new FormControl('');
  pipe = new DatePipe('en-US');
  criar = true
  displayedColumns: string[] = [
      'nome',
      'opcoes',
  ];
  @ViewChild('paginator') paginator: MatPaginator;
  cargos: MatTableDataSource<{ id: string, name: string}>;
  cargosL: number = 0;
  constructor(
      private adminSrv: OfficeService,
      public dialog: MatDialog,
      private fb: FormBuilder,
      private toastr: ToastrService
  ) {
  }

  form = this.fb.group({
    id: [''],
    name: ['', [Validators.required]]
  })

  ngOnInit(): void {
      this.requisicoes();
  }

  requisicoes() {
      this.adminSrv.getOffices().subscribe((e) => {
          const cargos = e.sort((a,b) => {
              if (a.name < b.name) {
                  return 1;
                }
                if (a.name > b.name) {
                  return -1;
                }
                return 0;
          });
          this.cargos = new MatTableDataSource(cargos);
          this.cargosFiltrados = new MatTableDataSource(cargos);
          this.cargosFiltrados.paginator = this.paginator;
          this.cargos.paginator = this.paginator;
          this.cargosL = this.cargos?.data.length;
      });
  }
  cargosFiltrados: MatTableDataSource<{ id: string, name: string}>;
  filtarUsuarios(e) {
      const data = this.cargos.data.filter((u) =>
          u.name.toUpperCase().includes(e.toUpperCase())
      );
      this.cargosFiltrados = new MatTableDataSource(data);
      this.cargosFiltrados.paginator = this.paginator;
  }

  deletarUsuario(id): void {
    console.log(id)
      this.dialog.open(DeleteModalComponent, {
          data: {
              nome: 'Cargos',
              data: () => { 
                  this.dialog.closeAll();
                  this.adminSrv.deleteUser(id).subscribe(() => {
                      this.toastr.success('Deletado com Sucesso');
                      this.requisicoes();
                  });
              },
          },
      });
  }

  criarUsuario(): void {
    if (!this.form.valid) {
      this.toastr.error('Cargo inválido')
      this.form.markAllAsTouched()
      return
    }
    const cargo = this.cargos.data.find(c => c.name === this.form.value.name)
    if (cargo) {
      this.toastr.error('Cargo já cadastrado')
      this.form.markAllAsTouched()
      return
    }
    this.adminSrv.upsertCargo(this.form.value).subscribe(() => {
      this.toastr.success('criado com Sucesso');
      this.requisicoes();
      this.cancelarEdicao()
  });
  }
  editarUsuario(element): void {
      this.criar = false
      this.form.patchValue(element)
  }
  cancelarEdicao() {
    this.criar = true
    this.form.reset()
  }
}
