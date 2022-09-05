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
import {
    clienteForm,
    contatoLimpo,
    formLimpo,
    garagemForm,
    garagemLimpa,
} from './forms';
import { CepService } from 'app/modules/services/cep';
import { EmpresasService } from 'app/modules/services/empresas';
import { UfsService } from 'app/modules/services/ufs';
import _ from 'lodash';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent extends PaginaSimples implements OnInit {
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
        const dialogRef = this.dialog.open(DialogoEdicaoClientesComponent, {
            data: cliente,
        });

        dialogRef.afterClosed().subscribe((result) => {
            // window.location.reload();
        });
    }
    dialogoCriacao(): void {
        const dialogRef = this.dialog.open(DialogoCriacaoClientesComponent);

        dialogRef.afterClosed().subscribe(() => {
            // window.location.reload();
        });
    }
}

@Component({
    selector: 'criar-consultor',
    templateUrl: 'cliente-criar-editar.html',
    styleUrls: ['./clientes.component.scss'],
})
export class DialogoCriacaoClientesComponent extends Dialog implements OnInit {
    empresas: any = [];
    ufs: any = [];
    consultores: any = [];
    form = clienteForm;
    page = 'CRIAR';
    constructor(
        public fb: FormBuilder,
        public empresasService: EmpresasService,
        public ufsService: UfsService,
        public consultoresService: ConsultoresService,
        private cepService: CepService,
        public clienteService: ClienteService
    ) {
        super();
    }

    get contatos(): FormArray<FormGroup> {
        return this.form.controls[
            'contatos'
        ] as unknown as FormArray<FormGroup>;
    }

    get garagens(): FormArray<FormGroup> {
        return this.form.controls[
            'garagens'
        ] as unknown as FormArray<FormGroup>;
    }
    ngOnInit(): void {
        clienteForm.reset();
        this.form = _.cloneDeep(clienteForm);

        this.form = formLimpo;
        this.requisicoes();
        if (this.form.value.contatos.length === 0) {
            this.addContato();
        }
        if (this.form.value.garagens.length === 0) {
            this.addGaragem();
        }
    }

    requisicoes(): void {
        this.empresasService.getEmpresas().subscribe((result) => {
            this.empresas = result.data;
        });
        this.ufsService.getUfs().subscribe((result) => {
            this.ufs = result;
        });
        this.consultoresService.getConsultores().subscribe((result) => {
            this.consultores = result.data;
        });
    }

    addContato(): void {
        this.contatos.push(contatoLimpo);
    }

    addGaragem(): void {
        this.garagens.push(garagemLimpa);
    }

    obterCep(cep: any, index: number): any {
        if (cep.value >= 7) {
            this.cepService.getCep(cep.value).subscribe((result: any) => {
                const f = this.form.controls['garagens'];
                f.get([index])?.patchValue({
                    endereco: result.street,
                    municipio: result.neighborhood,
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    uf_icms: result.state,
                });
            });
        } else {
            return false;
        }
    }

    deleteGaragem(lessonIndex: number): void {
        this.garagens.removeAt(lessonIndex);
    }

    deleteContato(lessonIndex: number): void {
        this.contatos.removeAt(lessonIndex);
    }
    onSubmit(): void {
        if (!this.form.invalid) {
            const result = this.form.value;
            this.clienteService.postCliente(result).subscribe(() => {
                // window.location.reload();
            });
        }
    }
}

@Component({
    selector: 'editar-consultor',
    templateUrl: 'cliente-criar-editar.html',
    styleUrls: ['./clientes.component.scss'],
})
export class DialogoEdicaoClientesComponent
    extends DialogoCriacaoClientesComponent
    implements OnInit
{
    page = 'EDITAR';

    constructor(
        public override fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        empresasService: EmpresasService,
        ufsService: UfsService,
        consultoresService: ConsultoresService,
        cepService: CepService,
        clienteService: ClienteService
    ) {
        super(
            fb,
            empresasService,
            ufsService,
            consultoresService,
            cepService,
            clienteService
        );
    }
    override ngOnInit(): void {
        this.requisicoes();
        this.form = _.cloneDeep(clienteForm);
        const garagemDefault = _.cloneDeep(garagemLimpa);
        const contatoDefault = _.cloneDeep(contatoLimpo);

        if (this.form.value.contatos.length === 0) {
            this.data.contatos.forEach((data: any) => {
                contatoDefault.patchValue({
                    nome: data.nome,
                    cargo: data.cargo,
                    telefone: data.telefone,
                    email: data.email,
                    observacao: data.observacao,
                });
                this.contatos.push(
                    contatoDefault
                );
            });
        }
        if (this.form.value.garagens.length === 0) {
            this.data.garagens.forEach((data: any) => {
                garagemDefault.patchValue({
                    cep: data.cep,
                    nome: data.nome,
                    cnpj: data.cnpj,
                    endereco: data.endereco,
                    complemento: data.complemento,
                    numero: data.numero,
                    municipio: data.municipio,
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    uf_icms: data.uf_icms,
                });
                this.garagens.push(
                    garagemDefault
                );
            });
        }

        this.form.patchValue({
            id: this.data.id,
            nome: this.data.nome,
            cnpj: this.data.cnpj,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            empresa_id: this.data.empresa.id,
            uf: this.data.uf,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            consultor_id: this.data.consultor.id,
        });
    }

    override onSubmit(): void {
        const result = this.form.value;
        const id = result.id;
        if (!this.form.invalid) {
            this.clienteService
                .editCliente(result, id as string)
                .subscribe(() => {
                    // window.location.reload();
                });
        }
    }
}
