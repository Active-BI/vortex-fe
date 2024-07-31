import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Data, Route, Router } from '@angular/router';
import { GlobalService } from 'app/modules/services/appServices/globalService';
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
        private globalService: GlobalService
    ) {
        this.router.params.subscribe((e) => {
            this.enable = false;
            this.type = e.type;
            this.group = e.group;
            const currentUrl = window.location.href;

            this.globalService.userRoute$.subscribe((routes) => {
                // se as rotas não houverem sido carregadas
                if (routes.length === 0) return;

                // se as rotas forem carregadas e o usuário não tiver permissão, ele será redirecionado para a página inicial
                if (
                    routes.length < 1 ||
                    !routes.find((dr) => {
                        if (dr.children) {
                            return dr.children.find(
                                (r) => r.link === currentUrl.split('app/')[1]
                            );
                        } else {
                            return false;
                        }
                    })
                ) {
                    this.route.navigateByUrl('/app/inicio');
                    return;
                }
            });

            setTimeout(() => {
                this.enable = true;
            }, 300);
        });
    }

    ngOnInit(): void {}
}
