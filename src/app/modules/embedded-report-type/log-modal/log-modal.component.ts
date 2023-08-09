import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-log-modal',
    templateUrl: './log-modal.component.html',
    styleUrls: ['./log-modal.component.scss'],
})
export class LogModalComponent {
    constructor(
        private dialogRef: MatDialogRef<LogModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog
    ) {
        // console.log(this.data.erro);
        dialogRef.disableClose = true;
    }
    voltar(): void {
        // this.dialog.closeAll();
        this.data.data();
    }
}
