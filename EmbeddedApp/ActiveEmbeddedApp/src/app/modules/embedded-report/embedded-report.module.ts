import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { EmbeddedReportComponent } from './embedded-report.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
    declarations: [
        EmbeddedReportComponent
    ],
    imports: [
        CommonModule,
        PowerBIEmbedModule,
        MatIconModule,
        MatMenuModule
    ],
    exports:[EmbeddedReportComponent]
})
export class EbeddedReportModule
{
}
