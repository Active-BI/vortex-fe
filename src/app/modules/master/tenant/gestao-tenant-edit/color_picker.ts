import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  template: `
    <div class="color-picker">
      <input type="color" [(ngModel)]="selectedColor" (change)="onColorChange()" />
    </div>
  `,
  styles: [`
    .color-picker {
      display: flex;
      align-items: center;
    }

    .color-preview {
      width: 30px;
      height: 30px;
      margin-left: 10px;
      border: 1px solid #ddd;
    }
  `],
})
export class ColorPickerComponent {
  @Output() colorSelected = new EventEmitter<string>();
  @Input() selectedColor: string = '#ffffff';

  onColorChange() {
    this.colorSelected.emit(this.selectedColor);
  }
}