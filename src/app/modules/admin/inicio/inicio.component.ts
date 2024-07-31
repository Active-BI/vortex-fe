import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'app/modules/services/globalService';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit, OnDestroy {
    constructor() {}
    ngOnDestroy(): void {
    }
    ngOnInit(): void {
    }
}
