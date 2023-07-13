import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-bi-report-default',
    templateUrl: './bi-default-tipo.component.html',
    styleUrls: ['./bi-default-tipo.component.scss'],
})
export class BiReportDefaultByTypeComponent implements OnInit {
    type = '';
    enable = false;
    layout = 'desktop';
    parametro$ = Observable<Data>;
    constructor(private router: ActivatedRoute) {}

    ngOnInit(): void {
        this.router.params.subscribe((e) => {
            // console.log(e)
            console.log(e);
            this.enable = false;
            this.type = e.type;
            setTimeout(() => {
                this.enable = true;
            }, 300);
        });
    }
}
