import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-bi-dashboard-default',
    templateUrl: './bi-default.component.html',
    styleUrls: ['./bi-default.component.scss'],
})
export class BiDashboardDefaultComponent implements OnInit {
    type = '';
    group = '';
    enable = false;
    layout = 'desktop';
    parametro$ = Observable<Data>;
    constructor(private router: ActivatedRoute) {}

    ngOnInit(): void {
        this.router.params.subscribe((e) => {
            this.enable = false;
            this.type = e.type;
            this.group = e.group; 
            setTimeout(() => {
                this.enable = true;
            }, 300);
        });
    }
}
