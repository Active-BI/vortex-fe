import { Component, Input, OnInit } from '@angular/core';
import { EmbeddedService } from '../services/embedded/embedded.service';

@Component({
    selector: 'app-embedded-report',
    templateUrl: './embedded-report.component.html',
    styleUrls: ['./embedded-report.component.scss'],
})
export class EmbeddedReportComponent implements OnInit {
    @Input() reportId: string;
    @Input() groupId: string;
    @Input() type: string;

    token;
    user;
    config;
    configDashboard;
    showReport=false;

    handlers;

    constructor(private embeddedSrv: EmbeddedService) {
        this.handlers =  new Map([
            ['loaded', (): void => console.log('Report loaded')],
            ['rendered', (): void => console.log('Report rendered')],
            ['error', (event): void => console.log(event.detail)]
        ]);
    }

    ngOnInit(): void {
        this.embeddedSrv.getEmbeddedInfo(
            this.groupId,
            this.reportId
        ).subscribe((res) => {
                console.log(res);
                this.token = res.EmbedToken;
                this.config = {
                    type: 'report',
                    tokenType: 1,
                    embedUrl: res.EmbedReport[0].EmbedUrl,
                    id: res.EmbedReport[0].ReportId,
                    accessToken: this.token.Token,
                    hostname: 'https://app.powerbi.com',
                    settings: {
                        visualRenderedEvents: true,
                        panes: {
                            filters: {
                                visible: false,
                            },
                            pageNavigation: {
                                visible: false,
                            },
                        },
                    },
                };
                this.configDashboard = {
                    type: 'dashboard',
                    tokenType: 1,
                    embedUrl: res.EmbedReport[0].EmbedUrl,
                    id: res.EmbedReport[0].ReportId,
                    accessToken: this.token.Token,
                    hostname: 'https://app.powerbi.com',
                    settings: {
                        visualRenderedEvents: true,
                        panes: {
                            filters: {
                                visible: false,
                            },
                            pageNavigation: {
                                visible: false,
                            },
                        },
                    },
                };
                this.showReport = true;

            },
            (err) => {}
        );
    }
}
