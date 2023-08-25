import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-deletar-grupo',
    templateUrl: './deletar-grupo.component.html',
})
export class DeletarGrupoComponent {
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
