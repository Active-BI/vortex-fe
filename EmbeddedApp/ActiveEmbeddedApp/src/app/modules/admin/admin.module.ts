import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
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
import { CreateUserComponent } from './users/create-user/create-user.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { getPortuguesePaginatorIntl } from '../services/portuguese-paginator-intl';
import {MatBadgeModule} from '@angular/material/badge';
import { AuthGuard } from '../services/guard/auth.guard';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

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
        path: 'financeiro',
        component: GestaoVulnerabilidadeComponent,
    },
    {
        path: 'gente-e-gestao',
        component: CorrelacionamentoLogsComponent,
    },
    {
        path: 'operacao',
        component: MapeamentoDadosSensiveisComponent,
        // canActivate: [AuthGuard],
        // data: {expectedRole: ['User','Admin']}
    },
    {
        path: 'comercial',
        component: MapeamentoDadosSensiveisComponent,
    },
    {
        path: 'juridico',
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
    {
        path: 'usuarios-editar',
        component: EditUserComponent,
    },
    {
        path: 'usuarios-editar/:id',
        component: EditUserComponent,
    },
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
        CreateUserComponent,
        ListUsersComponent,
        EditUserComponent,
        
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
        SharedModule,
        MatBadgeModule,
        MatAutocompleteModule,
    ],
    entryComponents: [MatDialogModule],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {}
