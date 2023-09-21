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
    group = '';
    enable = false;
    layout = 'desktop';
    report_type = '';
    parametro$ = Observable<Data>;
    constructor(private router: ActivatedRoute, private route: Router) {}

    ngOnInit(): void {
        this.router.params.subscribe((e) => {
            this.enable = false;
            this.type = e.type;
            this.group = e.group;

            const dashUsers = JSON.parse(localStorage.getItem('userRoutes'));
            console.log(e);
            if (
                dashUsers.length < 1 ||
                !dashUsers.find(
                    (r) =>
                        r.link.includes(this.type) &&
                        r.link.includes(this.group)
                )
            ) {
                this.route.navigateByUrl('/app/inicio');
                return;
            }
            const route = dashUsers.find(
                (r) => r.link.includes(this.type) && r.link.includes(this.group)
            );
            console.log(route, route.report_type);
            this.report_type = route.report_type;
            setTimeout(() => {
                this.enable = true;
            }, 300);
        });
    }
}
