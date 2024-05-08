import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    ExtraOptions,
    PreloadAllModules,
    Router,
    RouterModule,
} from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { ToastrModule } from 'ngx-toastr';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { HomeModule } from './modules/home/home.module';
import { SocketService } from './modules/services/socket.service';
import { AccessModelComponent } from './modules/auth/access-model/access-model.component';
import { LocalAuthService } from './modules/services/auth.service';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);
 
const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    declarations: [AppComponent, AccessModelComponent],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },     { provide: LOCALE_ID, useValue: 'pt-BR' },
],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        ToastrModule.forRoot({
            preventDuplicates: true,
            positionClass: 'toast-top-right',
            timeOut: 1500,
        }),
        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        HomeModule,
        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        MatChipsModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    socket: any;
    session;
    constructor(
        private router: Router,
        private socketService: SocketService,
        private authService: LocalAuthService
    ) {
        this.socket = this.socketService.socket;
        this.socket.on('logou', (res) => {});
        // Promise.all([localStorage.getItem('session_id')]).then((res) => {
        //     this.session = res[0];
        //     if (res[0]) this.socket.emit('user-check', res[0]);
        // });

        // this.socket.on('logout', () => {
        //     localStorage.clear();
        //     this.socket.disconnect();
        //     this.router.navigate(['auth/sign-out']);
        // });

        this.authService.get_app_image().subscribe(
            (res) => {
                localStorage.setItem('app_image', res.app_image);
                localStorage.setItem('logo', res.tenant_image);
                localStorage.setItem('bg_color', res.bg_color);
            },
            ({ error }) => {}
        );
    }
}
