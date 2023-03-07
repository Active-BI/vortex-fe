import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AdminComponent } from './admin.component';
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
import {MatBadgeModule} from '@angular/material/badge';
import { AuthGuard } from '../services/guard/auth.guard';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { BiDefaultComponent } from './bi-default/bi-default.component';

const adminroutes: Route[] = [
    {
        path: '',
        component: InicioComponent,
        pathMatch: 'full',
    },
    {
        path: 'view/:reportId/:groupId',
        component: GestaoVulnerabilidadeComponent,
    },
    {
        path: 'inicio',
        component: InicioComponent,
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
        path: 'usuarios-editar/:id',
        component: EditUserComponent,
    },
];

@NgModule({
    declarations: [
        InicioComponent,
        AdminComponent,
        GestaoVulnerabilidadeComponent,
        DeleteModalComponent,
        CreateUserComponent,
        ListUsersComponent,
        EditUserComponent,
        BiDefaultComponent
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
