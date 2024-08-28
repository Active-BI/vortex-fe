import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalAuthService } from 'app/modules/services/auth.service';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit, OnDestroy {
    user;
    constructor(private localAuthService: LocalAuthService) {}
    ngOnDestroy(): void {}
    ngOnInit(): void {
        console.log(this.user);
    }
}
