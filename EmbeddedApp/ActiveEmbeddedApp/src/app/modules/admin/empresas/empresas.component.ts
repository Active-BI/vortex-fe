import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
    Dialog,
    PaginaSimples,
} from 'app/modules/services/abstractPages/abstractPage';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresasService } from 'app/modules/services/empresas';
import { UfsService } from 'app/modules/services/ufs';
import { CnpjCpfValidator } from 'app/modules/services/utils/CnpjCpfValidator';

@Component({
    selector: 'app-consultores',
    templateUrl: './empresas.component.html',
    styleUrls: ['./empresas.component.scss'],
})
export class EmpresasComponent extends PaginaSimples implements OnInit {
    @ViewChild('paginator') paginator: MatPaginator;
    displayedColumns: string[] = [
        'nome',
        'cnpj',
        'domicilio_fiscal',
        'createdAt',
        'id',
    ];
    public empresas: any = [];
    constructor(
        public dialog: MatDialog,
        public empresasService: EmpresasService
    ) {
        super();
    }

    ngOnInit(): void {
        this.requisicoes();
    }

    requisicoes(): void {
        this.empresasService.getEmpresas().subscribe((res) => {
            this.empresas = new MatTableDataSource(res.data);
            this.empresas.paginator = this.paginator;
        });
    }

    deletar(id: string): void {
        this.dialog.open(DeleteModalComponent, {
            data: () =>
                this.empresasService.deletarEmpresas(id).subscribe((res) => {
                    this.empresas = res.data;
                    window.location.reload();
                }),
        });
    }

    dialogoEdicao(cliente: any): void {
        const dialogRef = this.dialog.open(DialogoEdicaoEmpresasComponent, {
            data: cliente,
        });

        dialogRef.afterClosed().subscribe(() => {});
    }

    dialogoCriacao(): void {
        const dialogRef = this.dialog.open(DialogoCriacaoEmpresasComponent);

        dialogRef.afterClosed().subscribe(() => {});
    }
}

@Component({
    selector: 'criar-empresas',
    templateUrl: 'empresas-criar-editar.html',
    styleUrls: ['./empresas.component.scss'],
})
export class DialogoCriacaoEmpresasComponent extends Dialog {
    page = 'CRIAR';
    ufs: any[] = [];

    constructor(
        public fb: FormBuilder,
        public ufsService: UfsService,
        public empresasService: EmpresasService
    ) {
        super();
        this.requisicoes();
    }

    requisicoes(): void {
        this.ufsService.getUfs().subscribe((result) => {
            this.ufs = result;
          });
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    form = this.fb.group({
        'id': [''],
        'nome': ['', [Validators.required, Validators.minLength(3)]],
        'cnpj': ['', [Validators.required, CnpjCpfValidator.isValidCnpj()]],
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'domicilio_fiscal': ['', [Validators.required]],
      });

    onSubmit(): void {
        if (!this.form.invalid) {
            this.empresasService.postEmpresas(this.form.value).subscribe((res) => {
              window.location.reload();
            });
          }
    }
}

@Component({
    selector: 'editar-empresas',
    templateUrl: 'empresas-criar-editar.html',
    styleUrls: ['./empresas.component.scss'],
})
export class DialogoEdicaoEmpresasComponent
    extends DialogoCriacaoEmpresasComponent
    implements OnInit
{
    empresa: any = {};
    override page = 'EDITAR';

    constructor(
        fb: FormBuilder,
        public ufsService: UfsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public empresasService: EmpresasService
    ) {
        super(fb, ufsService, empresasService);
        this.empresa = data;
    }

    ngOnInit(): void {
        this.form.patchValue({
            id: this.empresa.id,
            cnpj: this.empresa.cnpj,
            nome: this.empresa?.nome,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            domicilio_fiscal: this.empresa?.domicilio_fiscal,
        });
    }

    override onSubmit(): void {
        if (!this.form.invalid) {
            this.empresasService.editarEmpresas(this.form.value, this.form.value.id as string).subscribe((res) => {
              window.location.reload();
            });
          }
    }
}
