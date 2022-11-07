import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { EmbeddedReportComponent } from './embedded-report.component';



@NgModule({
    declarations: [
        EmbeddedReportComponent
    ],
    imports: [
        CommonModule,
        PowerBIEmbedModule,
    ],
    exports:[EmbeddedReportComponent]
})
export class EbeddedReportModule
{
}
