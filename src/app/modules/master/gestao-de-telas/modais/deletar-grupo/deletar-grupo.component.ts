import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-deletar-grupo',
    templateUrl: './deletar-grupo.component.html',
    styles: [
        `
            .prevent-select {
                -webkit-user-select: none; /* Safari */
                -ms-user-select: none; /* IE 10 and IE 11 */
                user-select: none; /* Standard syntax */
            }
        `,
    ],
})
export class DeletarGrupoComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private fb: FormBuilder
    ) {
        console.log(this.data);
    }
    form = this.fb.group({
        name: [
            '',
            [
                Validators.required,
                ({ value }) => {
                    if (value !== this.data.nome) {
                        return { error: 'nome inválido' };
                    }
                },
            ],
        ],
    });

    onSubmit(): void {
        this.data.data();
    }
    voltar(): void {
        this.dialog.closeAll();
    }
}
