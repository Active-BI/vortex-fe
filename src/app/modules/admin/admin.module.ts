import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AdminComponent } from './admin.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {
    MatPaginatorIntl,
    MatPaginatorModule,
} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { EbeddedReportModule } from 'app/modules/embedded-report/embedded-report.module';
import { LayoutModule } from '@angular/cdk/layout';

// Compontents
import { GestaoVulnerabilidadeComponent } from './gestao-vulnerabilidade/gestao-vulnerabilidade.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { getPortuguesePaginatorIntl } from '../services/portuguese-paginator-intl';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { BiReportDefaultComponent } from './bi-report-default/bi-default.component';
import { EbeddedDashboardModule } from '../embedded-dashboard/embedded-dashboard.module';
import { BiDashboardDefaultComponent } from './bi-dashboard-default/bi-default.component';
import { MessagesModule } from 'app/layout/common/messages/messages.module';
import { MenusComponent } from './menus/menus.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenusCreateComponent } from './menus/menus-create/menus-create.component';
import { EbeddedReportTypeModule } from '../embedded-report-type/embedded-report.module';
import { BiReportDefaultByTypeComponent } from './bi-report-default-tipo/bi-default-tipo.component';

const adminroutes: Route[] = [
    {
        path: '',
        component: InicioComponent,
        pathMatch: 'full',
    },
    {
        path: 'view-report/:reportId/:groupId',
        component: BiReportDefaultComponent,
    },
    {
        path: 'view-report-type/:type',
        component: BiReportDefaultByTypeComponent,
    },
    {
        path: 'view-dashboard/:reportId/:groupId',
        component: BiDashboardDefaultComponent,
    },
    {
        path: 'inicio',
        component: InicioComponent,
    },

    {
        data: { expectedRoles: ['Admin'] },
        path: 'usuarios',
        component: ListUsersComponent,
    },

    {
        data: { expectedRoles: ['Admin'] },

        path: 'usuarios-criar',
        component: CreateUserComponent,
    },
    {
        data: { expectedRoles: ['Admin'] },

        path: 'usuarios-editar/:id',
        component: EditUserComponent,
    },
];

@NgModule({
    declarations: [
        InicioComponent,
        AdminComponent,
        DeleteModalComponent,
        CreateUserComponent,
        ListUsersComponent,
        EditUserComponent,
        BiDashboardDefaultComponent,
        BiReportDefaultComponent,
        MenusComponent,
        MenusCreateComponent,
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
        EbeddedDashboardModule,
        EbeddedReportTypeModule,
        MatExpansionModule,
        FuseAlertModule,
        SharedModule,
        MatBadgeModule,
        MessagesModule,
        MatAutocompleteModule,
        MatTooltipModule,
    ],
    entryComponents: [MatDialogModule],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
