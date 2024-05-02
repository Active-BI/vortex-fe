import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'davita-trash-btn',
  templateUrl: './davita-trash-btn.component.html',
  styleUrls: ['./davita-trash-btn.component.scss']
})
export class DavitaTrashBtnComponent implements OnInit {
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Input() name = ""
  @Input() row: any
  @Input() g = 'M'

  message = ''
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
this.message = this.g === 'M' ? `O ${this.name} será removido permanentemente.` : `A ${this.name} será removida permanentemente.`
  }
  deletar(): void {
    let dialogRef = this.dialog.open(DeleteModalComponent, {
          data: {
              message: this.message,
              data: () => { 
                  this.delete.emit();
                  dialogRef.close()
              },
          },
      });
  }
}
