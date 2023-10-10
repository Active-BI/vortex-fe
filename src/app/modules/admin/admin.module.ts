import { CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
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
import { LayoutModule } from '@angular/cdk/layout';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatTooltipModule } from '@angular/material/tooltip';

import { EbeddedReportTypeModule } from '../embedded-report-type/embedded-report.module';
import { BiReportDefaultByTypeComponent } from './bi-report-default-tipo/bi-default-tipo.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
import { AuthGuardScreen } from '../services/guards/AuthGuardScreen.guard';
import { HomeComponent } from '../home/home.component';
import { MatRadioModule } from '@angular/material/radio';
import { RequestModalComponent } from '../home/access-request/request-modal/request-modal.component';
import { LogModalComponent } from '../embedded-report-type/log-modal/log-modal.component';
import { SignUpModalComponent } from '../auth/sign-up/sign-up-modal/sign-up-modal.component';
import { PageMasterService } from '../services/page-master.service';
import { TfaComponent } from '../auth/tfa/tfa.component';
import { MatMenuModule } from '@angular/material/menu';

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
        path: 'view-report/:group/:type',
        component: BiReportDefaultByTypeComponent,
    },
    {
        path: 'administrador',
        children: [
            {
                data: { expectedRoles: ['Admin'] },
                path: 'usuarios',
                component: ListUsersComponent,
                canActivate: [AuthGuardScreen],
            },
            {
                data: { expectedRoles: ['Admin'] },
                canActivate: [AuthGuardScreen],
                path: 'usuarios-criar',
                component: CreateUserComponent,
            },
            {
                data: { expectedRoles: ['Admin'] },
                canActivate: [AuthGuardScreen],
                path: 'usuarios-editar/:id',
                component: EditUserComponent,
            },
        ],
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
        HomeComponent,
        // AccessRequestComponent,
        RequestModalComponent,
        LogModalComponent,
        SignUpModalComponent,
        TfaComponent,
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
        EbeddedDashboardModule,
        EbeddedReportTypeModule,
        MatExpansionModule,
        MatSlideToggleModule,
        FuseAlertModule,
        SharedModule,
        MatSidenavModule,
        MatRadioModule,
        MatBadgeModule,
        MessagesModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatMenuModule,
        FormsModule,
        MatFormFieldModule,
        NgForOf,
        MatInputModule,
    ],
    entryComponents: [MatDialogModule],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
        NavigationMockApi,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {
    constructor() {}
}
