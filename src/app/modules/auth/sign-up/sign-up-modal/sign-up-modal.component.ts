import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-sign-up-modal',
    templateUrl: './sign-up-modal.component.html',
    styleUrls: ['./sign-up-modal.component.scss'],
})
export class SignUpModalComponent {
    constructor(
        private dialogRef: MatDialogRef<SignUpModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog
    ) {
        dialogRef.disableClose = true;
    }
    voltar(): void {
        // this.dialog.closeAll();
        this.data.data();
    }
}
