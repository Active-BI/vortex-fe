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
import { GestaoTenantEditComponent } from './tenant/gestao-tenant-edit/gestao-tenant-edit.component';
import { GestaoTenantCriarComponent } from './tenant/gestao-tenant-criar/gestao-tenant-criar.component';
import { AdminRequestBlockModalComponent } from './admin-request/admin-request-block-modal/admin-request-block-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { AdminRequestConfirmationModalComponent } from './admin-request/admin-request-confirmation-modal/admin-request-confirmation-modal.component';
import { AdminRequestsComponent } from './admin-request/admin-requests/admin-requests.component';
import { TenantUserListComponent } from './tenant-user-list/tenant-user-list.component';
import { AddAdminAccessComponent } from './tenant-user-list/add_access_admin/add_access_admin.component';

const masterRoutes: Route[] = [
    {
        path: 'gestao/telas',
        component: GestaoTenantComponent,
    },
    {
        path: 'gestao/tenants',
        component: GestaoTenantComponent,
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
    {
        path: 'gestao/solicitacoes-de-cadastro',
        component: AdminRequestsComponent,
    },
];

@NgModule({
    declarations: [
        GestaoTenantComponent,
        GestaoTenantCriarComponent,
        AdminRequestsComponent,
        AdminRequestConfirmationModalComponent,
        AdminRequestBlockModalComponent,
        TenantUserListComponent,
        AddAdminAccessComponent,
        GestaoTenantEditComponent,
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
    constructor() {}
}
