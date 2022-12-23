import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
    Dialog,
    PaginaSimples,
} from 'app/modules/services/abstractPages/abstractPage';
import { ConsultoresService } from 'app/modules/services/consultores';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-consultores',
    templateUrl: './consultores.component.html',
    styleUrls: ['./consultores.component.scss'],
})
export class ConsultoresComponent extends PaginaSimples implements OnInit {
    @ViewChild('paginator') paginator: MatPaginator;
    displayedColumns: string[] = [
        'nome',
        'telefone',
        'responsavel',
        'createdAt',
        'id',
    ];
    public consultores: any = [];
    constructor(
        public dialog: MatDialog,
        public consultoresService: ConsultoresService
    ) {
        super();
    }

    ngOnInit(): void {
        // this.requisicoes();
    }

    requisicoes(): void {
        this.consultoresService.getConsultores().subscribe((res) => {
            this.consultores = new MatTableDataSource(res.data);
            this.consultores.paginator = this.paginator;
        });
    }

    deletar(id: string): void {
        this.dialog.open(DeleteModalComponent, {
            data: () =>
                this.consultoresService
                    .deletarConsultores(id)
                    .subscribe((res) => {
                        this.consultores = res.data;
                        window.location.reload();
                    }),
        });
    }

    dialogoEdicao(cliente: any): void {
        const dialogRef = this.dialog.open(DialogoEdicaoComponent, {
            data: cliente,
        });

        dialogRef.afterClosed().subscribe(() => {});
    }

    dialogoCriacao(): void {
        const dialogRef = this.dialog.open(DialogoCriacaoComponent);

        dialogRef.afterClosed().subscribe(() => {});
    }
}

@Component({
    selector: 'criar-consultor',
    templateUrl: 'consultor-criar-editar.html',
    styleUrls: ['./consultores.component.scss'],
})
export class DialogoCriacaoComponent extends Dialog {
    page = 'CRIAR';

    constructor(
        public fb: FormBuilder,
        public consultoresService: ConsultoresService
    ) {
        super();
    }

    requisicoes(): void {}

    // eslint-disable-next-line @typescript-eslint/member-ordering
    form = this.fb.group({
        id: [''],
        nome: [
            '',
            [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100),
            ],
        ],
        telefone: [
            '',
            [
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11),
            ],
        ],
        email: [
            '',
            [
                Validators.required,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            ],
        ],
        responsavel: ['', Validators.required],
    });
    onSubmit(): void {
        if (!this.form.invalid) {
            this.consultoresService.postConsultores(this.form.value).subscribe(
                (res) => {
                    window.location.reload();
                },
                (err: Error) => {}
            );
        }
    }
}

@Component({
    selector: 'editar-consultor',
    templateUrl: 'consultor-criar-editar.html',
    styleUrls: ['./consultores.component.scss'],
})
export class DialogoEdicaoComponent
    extends DialogoCriacaoComponent
    implements OnInit
{
    consultor: any = {};
    override page = 'EDITAR';

    constructor(
        fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        override consultoresService: ConsultoresService
    ) {
        super(fb, consultoresService);
        this.consultor = data;
    }

    ngOnInit(): void {
        this.form.patchValue({
            id: this.consultor?.id,
            nome: this.consultor?.nome,
            telefone: this.consultor?.telefone,
            email: this.consultor?.email,
            responsavel: this.consultor?.responsavel,
        });
    }

    override onSubmit(): void {
        if (!this.form.invalid) {
            this.consultoresService
                .editarConsultores(
                    this.form.value,
                    this.form.value.id as string
                )
                .subscribe(
                    (res) => {
                        window.location.reload();
                    },
                    (err: Error) => {}
                );
        }
    }
}
