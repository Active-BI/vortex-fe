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
import { EbeddedReportModule } from 'app/modules/embedded-report/embedded-report.module';
import { LayoutModule } from '@angular/cdk/layout';


// Compontents
import { GestaoVulnerabilidadeComponent } from './gestao-vulnerabilidade/gestao-vulnerabilidade.component';
import { CorrelacionamentoLogsComponent } from './correlacionamento-logs/correlacionamento-logs.component';
import { DeteccaoRespEndpointsComponent } from './deteccao-resp-endpoints/deteccao-resp-endpoints.component';
import { MapeamentoDadosSensiveisComponent } from './mapeamento-dados-sensiveis/mapeamento-dados-sensiveis.component';
import { GestaoConsetimentoCookiesComponent } from './gestao-consetimento-cookies/gestao-consetimento-cookies.component';
import { PrevencaoContraVazamentosDadosComponent } from './prevencao-contra-vazamentos-dados/prevencao-contra-vazamentos-dados.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { CreateUserComponent } from './users/create-user/create-user.component';

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
    {
        path: 'gestao-vulnerabilidades',
        component: GestaoVulnerabilidadeComponent,
    },
    {
        path: 'correlacionamento-logs',
        component: CorrelacionamentoLogsComponent,
    },
    {
        path: 'deteccao-resposta',
        component: DeteccaoRespEndpointsComponent,
    },
    {
        path: 'mapeamento-dados',
        component: MapeamentoDadosSensiveisComponent,
    },
    {
        path: 'gestao-consentmento-cookies',
        component: GestaoConsetimentoCookiesComponent,
    },  {
        path: 'prevencao-contra-vazamentos-dados',
        component: PrevencaoContraVazamentosDadosComponent,
    },
    {
        path: 'usuarios',
        component: ListUsersComponent,
    },
    {
        path: 'usuarios-criar',
        component: CreateUserComponent,
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
        DialogoCriacaoClientesComponent,
        GestaoVulnerabilidadeComponent,
        CorrelacionamentoLogsComponent,
        DeteccaoRespEndpointsComponent,
        MapeamentoDadosSensiveisComponent,
        PrevencaoContraVazamentosDadosComponent,
        GestaoConsetimentoCookiesComponent,
        ListUsersComponent,
        EditUserComponent,
        CreateUserComponent
    ],
    imports: [
        CommonModule,
        LayoutModule,
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
        EbeddedReportModule,
        MatExpansionModule,
        FuseAlertModule,
        SharedModule
        // HelpCenterModule
    ],
    entryComponents: [MatDialogModule],
})
export class AdminModule {}
