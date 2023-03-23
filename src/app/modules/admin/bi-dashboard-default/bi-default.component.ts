import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-bi-dashboard-default',
    templateUrl: './bi-default.component.html',
    styleUrls: ['./bi-default.component.scss'],
})
export class BiDashboardDefaultComponent implements OnInit {
    reportID = '';
    groupID = '';
    enable = false;
    layout = 'desktop';
    parametro$ = Observable<Data>;
    constructor(private router: ActivatedRoute) {}

    ngOnInit(): void {
        this.router.params.subscribe((e) => {
            // console.log(e)
            this.enable = false;
            this.reportID = e.reportId;
            this.groupID = e.groupId;
            setTimeout(() => {
                this.enable = true;
            }, 300);
        });
    }
}
