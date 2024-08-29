import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalAuthService } from 'app/modules/services/auth.service';
import { AuthService } from 'app/modules/services/auth/auth.service';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit, OnDestroy {
    user: any;
    constructor(private authService: AuthService) {}
    ngOnDestroy(): void {}
    ngOnInit(): void {
        this.user = this.authService.GetUser();
        console.log(this.user);
    }
}
