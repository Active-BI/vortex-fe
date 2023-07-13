import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { EmbeddedReportByTypeComponent } from './embedded-report.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BiReportDefaultByTypeComponent } from '../admin/bi-report-default-tipo/bi-default-tipo.component';
import { EmbeddedReportComponent } from '../embedded-report/embedded-report.component';

@NgModule({
    declarations: [
        EmbeddedReportByTypeComponent,
        BiReportDefaultByTypeComponent,
    ],
    imports: [
        CommonModule,
        PowerBIEmbedModule,
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
    ],
    exports: [EmbeddedReportByTypeComponent],
})
export class EbeddedReportTypeModule {}
