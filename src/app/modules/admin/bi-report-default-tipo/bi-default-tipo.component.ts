import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Data, Route, Router } from '@angular/router';
import { EmbeddedService } from 'app/modules/services/embedded/embedded.service';
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
    hasData = true;
    layout = 'desktop';
    report_type = '';
    parametro$ = Observable<Data>;
    constructor(
        private router: ActivatedRoute,
        private route: Router,
        private embeddedSrv: EmbeddedService
    ) {
        this.router.params.subscribe((e) => {
            this.enable = false;
            this.type = e.type;
            this.group = e.group;            const currentUrl = window.location.href;

            const dashUsers = JSON.parse(localStorage.getItem('userRoutes'));
            if (
                dashUsers.length < 1 ||
                !dashUsers.find((dr) => {
                    if (dr.children) {
                        return dr.children.find(r => r.link === currentUrl.split('app/')[1])
                    } else {
                        return false
                    }
                })
            ) {
                this.route.navigateByUrl('/app/inicio');
                return;
            }
            // const approute = dashUsers.find(
            //     (r) => r.link.includes(this.type) && r.link.includes(this.group)
            // );

            // this.report_type = approute.report_type;
            // console.log(this.report_type, this.report_type.includes('upload'));
            // if (this.report_type.includes('upload')) {
            //     this.embeddedSrv
            //         .checkIfReportHasData(this.group, this.type)
            //         .subscribe((res: boolean) => (this.hasData = res));
            // }
            setTimeout(() => {
                this.enable = true;
            }, 300);
        });
    }

    ngOnInit(): void {}
}
