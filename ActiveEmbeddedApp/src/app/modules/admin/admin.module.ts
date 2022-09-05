import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AdminComponent } from './admin.component';
import {
    ConsultoresComponent,
    DialogoCriacaoComponent,
    DialogoEdicaoComponent,
} from './consultores/consultores.component';
import { ImportacaoComponent } from './importacao/importacao.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogoCriacaoEmpresasComponent, DialogoEdicaoEmpresasComponent, EmpresasComponent } from './empresas/empresas.component';
import { MatSelectModule } from '@angular/material/select';
import { ClientesComponent, DialogoEdicaoClientesComponent, DialogoCriacaoClientesComponent } from './clientes/clientes.component';

const adminroutes: Route[] = [
    {
        path: '',
        component: InicioComponent,
        pathMatch: 'full',
    },
    {
        path: 'inicio',
        component: InicioComponent,
    },
    // {
    //     path: 'consultores',
    //     component: ConsultoresComponent,
    // },
    // {
    //     path: 'empresas',
    //     component: EmpresasComponent,
    // },
    // {
    //     path: 'importacao',
    //     component: ImportacaoComponent,
    // },
    // {
    //     path: 'clientes',
    //     component: ClientesComponent,
    // },
];

@NgModule({
    declarations: [
        InicioComponent,
        AdminComponent,
        ConsultoresComponent,
        ImportacaoComponent,
        DeleteModalComponent,
        DialogoCriacaoComponent,
        DialogoEdicaoComponent,
        EmpresasComponent,
        DialogoEdicaoEmpresasComponent,
        DialogoCriacaoEmpresasComponent,
        ClientesComponent,
        DialogoEdicaoClientesComponent,
        DialogoCriacaoClientesComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(adminroutes),
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        NgxMatFileInputModule,
        MatFormFieldModule,
        MatDialogModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
    ],
    entryComponents: [MatDialogModule],
})
export class AdminModule {}
