import { Component, OnInit } from '@angular/core';
import { LocalAuthService } from 'app/modules/services/auth.service';
import { SocketService } from 'app/modules/services/socket.service';

@Component({
    selector: 'app-access-model',
    templateUrl: './access-model.component.html',
    styleUrls: ['./access-model.component.scss'],
})
export class AccessModelComponent implements OnInit {
    bg_color = '';
    app_image = '';
    logo = '';
    constructor(
        private socketService: SocketService,
        private authService: LocalAuthService
    ) {
        this.socketService.socket.disconnect();
        this.app_image = localStorage.getItem('app_image');
        this.bg_color = localStorage.getItem('bg_color');
        this.logo = localStorage.getItem('logo');
        this.authService.get_app_image().subscribe(
            (res) => {
                localStorage.setItem('bg_color', res.bg_color);
                localStorage.setItem('app_image', res.app_image);
                localStorage.setItem('logo', res.tenant_image);
                this.bg_color = res.bg_color;
                this.app_image = res.app_image;
                this.logo = res.tenant_image;
            },
            ({ error }) => {}
        );
    }

    ngOnInit(): void {}
}
