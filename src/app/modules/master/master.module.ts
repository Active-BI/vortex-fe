import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {
    MatPaginatorIntl,
    MatPaginatorModule,
} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { getPortuguesePaginatorIntl } from '../services/portuguese-paginator-intl';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EbeddedDashboardModule } from '../embedded-dashboard/embedded-dashboard.module';
import { MessagesModule } from 'app/layout/common/messages/messages.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EbeddedReportTypeModule } from '../embedded-report-type/embedded-report.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
import { GestaoTenantComponent } from './tenant/gestao-tenant/gestao-tenant.component';
import {
    GestaoTenantEditComponent,
    EditDialogProjects,
} from './tenant/gestao-tenant-edit/gestao-tenant-edit.component';
import {
    DialogProjects,
    GestaoTenantCriarComponent,
} from './tenant/gestao-tenant-criar/gestao-tenant-criar.component';
import { MatSelectModule } from '@angular/material/select';
import { TenantUserListComponent } from './tenant-user-list/tenant-user-list.component';
import { EditAdminAccessComponent } from './tenant-user-list/edit_access_admin/edit_access_admin.component';
import { GestaoDeTelasComponent } from './gestao-de-telas/gestao-de-telas.component';
import {
    EdicaoCriacaoGrupoComponent,
    EdicaoGrupoComponent,
} from './gestao-de-telas/modais/criacao-grupo/edicao-criacao-grupo.component';
import { MatChipsModule } from '@angular/material/chips';
import { RotasAninhadasComponent } from './gestao-de-telas/rotas-aninhadas/rotas-aninhadas.component';
import { DeletarGrupoComponent } from './gestao-de-telas/modais/deletar-grupo/deletar-grupo.component';
import { DeletarRotaAninhadaComponent } from './gestao-de-telas/modais/deletar-rota-aninhada/deletar-rota-aninhada.component';
import { CriarRotaComponent } from './gestao-de-telas/rotas-aninhadas/criar-rota/criar-rota.component';
import { EditarRotaComponent } from './gestao-de-telas/rotas-aninhadas/criar-rota/editar-rota.component';
import { ColorPickerComponent } from './tenant/gestao-tenant-edit/color_picker';
import { AddAccessAdminComponent } from './tenant-user-list/add-access-admin/add-access-admin.component';
import { ConfigsComponent } from './tenant/configs/configs.component';
import { NgxMaskModule } from 'ngx-mask';
import { DocumentosComponent } from '../admin/documentos/documentos.component';
import { AuthGuardScreen } from '../services/guards/AuthGuardScreen.guard';
import { GlobalService } from '../services/globalService';
import jwtDecode from 'jwt-decode';

const masterRoutes: Route[] = [
    {
        path: 'gestao/telas',
        component: GestaoDeTelasComponent,
    },
    {
        data: { expectedRoles: ['Admin'] },
        path: 'gestao/tenants/documentos-master',
        component: DocumentosComponent,
        canActivate: [AuthGuardScreen],
    },
    {
        path: 'gestao/telas/grupo/:id',
        component: RotasAninhadasComponent,
    },
    {
        path: 'gestao/telas/criar-tela-aninhada/groupId/:groupId',
        component: CriarRotaComponent,
    },
    {
        path: 'gestao/telas/editar-tela-aninhada/groupId/:groupId/screenId/:screenId',
        component: EditarRotaComponent,
    },

    {
        path: 'gestao/tenants',
        component: GestaoTenantComponent,
    },
    {
        path: 'gestao/documentos',
        component: DocumentosComponent,
    },
    {
        path: 'gestao/config',
        component: ConfigsComponent,
    },
    {
        path: 'gestao/tenants/criar',
        component: GestaoTenantCriarComponent,
    },
    {
        path: 'gestao/tenants/editar/:id',
        component: GestaoTenantEditComponent,
    },
    {
        path: 'gestao/tenants/:id/user/list',
        component: TenantUserListComponent,
    },
];

@NgModule({
    declarations: [
        DialogProjects,
        EditDialogProjects,
        AddAccessAdminComponent,
        GestaoTenantComponent,
        GestaoTenantCriarComponent,
        TenantUserListComponent,
        EditAdminAccessComponent,
        GestaoTenantEditComponent,
        GestaoDeTelasComponent,
        EdicaoCriacaoGrupoComponent,
        EdicaoGrupoComponent,
        RotasAninhadasComponent,
        DeletarGrupoComponent,
        DeletarRotaAninhadaComponent,
        CriarRotaComponent,
        EditarRotaComponent,
        ColorPickerComponent,
        ConfigsComponent,
    ],
    imports: [
        CommonModule,
        LayoutModule,
        RouterModule.forChild(masterRoutes),
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
        EbeddedDashboardModule,
        EbeddedReportTypeModule,
        MatExpansionModule,
        FuseAlertModule,
        SharedModule,
        MatBadgeModule,
        MessagesModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatSelectModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
    ],
    entryComponents: [MatDialogModule],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
        NavigationMockApi,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MasterModule {
    constructor(private globalService: GlobalService) {
        this.globalService.userData = jwtDecode(localStorage.getItem('token'));
    }
}
