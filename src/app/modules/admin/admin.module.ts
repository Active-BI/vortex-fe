import {
    CUSTOM_ELEMENTS_SCHEMA,
    LOCALE_ID,
    NgModule,
    OnInit,
} from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
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
import {
    DateAdapter,
    MAT_DATE_LOCALE,
    MatNativeDateModule,
} from '@angular/material/core';
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
import { MatTabsModule } from '@angular/material/tabs';

import { MatTooltipModule } from '@angular/material/tooltip';

import { EbeddedReportTypeModule } from '../embedded-report-type/embedded-report.module';
import { BiReportDefaultByTypeComponent } from './bi-report-default-tipo/bi-default-tipo.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
import { AuthGuardScreen } from '../services/guards/AuthGuardScreen.guard';
import { HomeComponent } from '../home/home.component';
import { MatRadioModule } from '@angular/material/radio';
import { LogModalComponent } from '../embedded-report-type/log-modal/log-modal.component';
import { SignUpModalComponent } from '../auth/sign-up/sign-up-modal/sign-up-modal.component';
import { PageMasterService } from '../services/page-master.service';
import { TfaComponent } from '../auth/tfa/tfa.component';
import { MatMenuModule } from '@angular/material/menu';
import { PageService } from '../services/page.service';
import { MenuItemService } from 'app/mock-api/common/navigation/data';
import { OfficesComponent } from './offices/offices.component';
import { SocketService } from '../services/socket.service';
import { ConnectionsComponent } from './connections/connections.component';
import { AtivosComponent } from './connections/ativos/ativos.component';
import { GeralComponent } from './connections/geral/geral.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TelasComponent } from './telas/telas.component';
import { SessionService } from '../services/session.service';
import { TreinamentoComponent } from './treinamento/treinamento.component';
import { BlogComponent } from './blog/blog.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { DavitaTrashBtnComponent } from './davita-trash-btn/davita-trash-btn.component';
import { AddDocumentosComponent } from './documentos/add-documentos/add-documentos.component';
import { WebPageComponent } from './web-page/web-page.component';
import { SafePipe } from '../services/sanitizerPipe';
import { GlobalService } from '../services/globalService';
import jwtDecode from 'jwt-decode';

const adminroutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inicio',
    },
    {
        path: 'inicio',
        component: InicioComponent,
    },
    {
        path: 'playlist/:playlistId',
        component: TreinamentoComponent,
    },
    {
        path: 'blog',
        component: BlogComponent,
    },
    {
        path: 'view-report/:group/:type',
        component: BiReportDefaultByTypeComponent,
    },
    {
        path: 'view-web-page/:web-page',
        component: WebPageComponent,
    },
    {
        path: 'view-dashboard/:group/:type',
        component: BiDashboardDefaultComponent,
    },
    {
        path: 'administrador',
        children: [
            {
                data: { expectedRoles: ['Admin'] },
                path: 'cargos',
                component: OfficesComponent,
                canActivate: [AuthGuardScreen],
            },
            {
                data: { expectedRoles: ['Admin'] },
                path: 'usuarios',
                component: ListUsersComponent,
                canActivate: [AuthGuardScreen],
            },
            {
                data: { expectedRoles: ['Admin'] },
                path: 'documentos',
                component: DocumentosComponent,
                canActivate: [AuthGuardScreen],
            },
            {
                data: { expectedRoles: ['Admin'] },
                path: 'relatorios',
                component: TelasComponent,
                canActivate: [AuthGuardScreen],
            },
            {
                data: { expectedRoles: ['Admin'] },
                path: 'conexoes',
                component: ConnectionsComponent,
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
        DeleteModalComponent,
        CreateUserComponent,
        ListUsersComponent,
        EditUserComponent,
        BiDashboardDefaultComponent,
        BiReportDefaultComponent,
        HomeComponent,
        LogModalComponent,
        SignUpModalComponent,
        TfaComponent,
        OfficesComponent,
        ConnectionsComponent,
        AtivosComponent,
        GeralComponent,
        TelasComponent,
        TreinamentoComponent,
        BlogComponent,
        DocumentosComponent,
        DavitaTrashBtnComponent,
        AddDocumentosComponent,
        WebPageComponent,
        SafePipe,
    ],
    imports: [
        MatTabsModule,
        CommonModule,
        MatFormFieldModule,
        LayoutModule,
        RouterModule.forChild(adminroutes),
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        NgxMatFileInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatDatepickerModule,
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
        MatTableModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    entryComponents: [MatDialogModule],
    providers: [
        SafePipe,
        { provide: LOCALE_ID, useValue: 'pt' },

        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
        NavigationMockApi,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {
    socket: any;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private socketService: SocketService,
        private MenuItemService: MenuItemService,
        private pageService: PageService,
        private globalService: GlobalService
    ) {
        this.socket = this.socketService.socket;
        this.callRoutes();
        setInterval(() => {
            Promise.all([localStorage.getItem('session_id')]).then((res) => {
                if (res[0]) {
                    this.socketService.alive();
                }
            });
            this.socket.on('logout', () => {
                localStorage.clear();
                this.socket.disconnect();
                this.router.navigate(['auth/sign-out']);
            });
        }, 5000);
    }

    async callRoutes() {
        if (
            localStorage.getItem('token') &&
            localStorage.getItem('token').length > 0
        ) {
            return await Promise.all([
                this.pageService.getUserRoutes().toPromise(),
            ]).then(async (res) => {
                this.globalService.userData = jwtDecode( localStorage.getItem('token'));
         

                const rotasTratadas = await this.MenuItemService.tratarRotas(res[0].userRoutes);
                this.globalService.userRoutes = rotasTratadas;
                    
           
            });
        }
    }
}
