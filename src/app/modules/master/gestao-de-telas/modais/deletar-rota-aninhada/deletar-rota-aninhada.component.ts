import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-deletar-rota-aninhada',
    templateUrl: './deletar-rota-aninhada.component.html',
})
export class DeletarRotaAninhadaComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog
    ) {}

    onSubmit(): void {
        this.data.data();
    }
    voltar(): void {
        this.dialog.closeAll();
    }
}
