import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Data, Route, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
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
    constructor(private router: ActivatedRoute, private route: Router) {}

    ngOnInit(): void {
        this.router.params.subscribe((e) => {
            this.enable = false;
            this.type = e.type;
            const dashUsers = JSON.parse(localStorage.getItem('userRoutes'));

            if (
                dashUsers.length < 1 ||
                !dashUsers.find((r) => r.link === this.type)
            ) {
                this.route.navigateByUrl('/app/inicio');
                return;
            }
            setTimeout(() => {
                this.enable = true;
            }, 300);
        });
    }
}
