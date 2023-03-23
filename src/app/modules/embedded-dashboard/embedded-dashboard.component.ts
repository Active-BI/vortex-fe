import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { EmbeddedService } from '../services/embedded/embedded.service';
import { PowerBIDashboardEmbedComponent } from 'powerbi-client-angular';
import {
    BreakpointObserver,
    BreakpointState,
    Breakpoints,
} from '@angular/cdk/layout';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-embedded-dashboard',
    templateUrl: './embedded-dashboard.component.html',
    styleUrls: ['./embedded-dashboard.component.scss'],
})
export class EmbeddedDashboardComponent implements OnInit, AfterViewInit {
    @Input() dashboardId: string;
    @Input() groupId: string;
    @Input() type: string;
    form: FormGroup = this.fb.group({
        vision: '',
    });

    @ViewChild(PowerBIDashboardEmbedComponent)
    dashboardObj!: PowerBIDashboardEmbedComponent;

    layout: string;
    token;
    config;
    configDashboard;
    showDashboard = false;
    dashboard: any;
    pages: any = [];
    handlers;

    constructor(
        private embeddedSrv: EmbeddedService,
        public breakpointObserver: BreakpointObserver,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.getEmbedded();
    }

    ngAfterViewInit(): void {}

    private getEmbedded(): void {
        this.embeddedSrv
            .getEmbeddedDashboardInfo(this.groupId, this.dashboardId)
            .subscribe(
                (res) => {
                    this.token = res.embedToken;

                    this.configDashboard = {
                        type: 'dashboard',
                        tokenType: 1,
                        embedUrl: res.reportsDetail[0].embedUrl,
                        id: res.reportsDetail[0].reportId,
                        accessToken: this.token.token,
                    };

                    this.showDashboard = true;
                },
                (err) => {}
            );
    }
}
