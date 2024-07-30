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
    constructor(private globalService: GlobalService, private router: Router) {}
    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }
    subscriber: Subscription;
    ngOnInit(): void {
        // this.globalService.userData$.subscribe((data) => console.log(data))
        this.subscriber = this.globalService.userRoute$.subscribe((routes) => {
            if (routes.length > 0) {
                if (location.href.includes('inicio')) {
                    const rotaEscolhida =
                        routes
                            .find((r) => r.title === 'Gestão Cliente')
                            ?.children?.find((r) => r.title === 'Zoho')?.link ||
                        routes[0].children[0].link;
                    const prefix = this.globalService.isMaster ? '' : '/app/';
                    console.log(prefix + rotaEscolhida)
                    this.router.navigate([prefix + rotaEscolhida]);
                }
            }
        });
    }
}
