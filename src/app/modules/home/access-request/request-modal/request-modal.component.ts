import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-request-modal',
    templateUrl: './request-modal.component.html',
    styleUrls: ['./request-modal.component.scss'],
})
export class RequestModalComponent {
    constructor(
        private dialogRef: MatDialogRef<RequestModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog
    ) {
        dialogRef.disableClose = true;
    }
    voltar(): void {
        this.dialog.closeAll();
        this.data.data();
    }
}
