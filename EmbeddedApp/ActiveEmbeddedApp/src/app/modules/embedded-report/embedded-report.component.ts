import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { EmbeddedService } from '../services/embedded/embedded.service';
import { PowerBIReportEmbedComponent } from 'powerbi-client-angular';
import {
    BreakpointObserver,
    BreakpointState,
    Breakpoints
  } from '@angular/cdk/layout';

@Component({
    selector: 'app-embedded-report',
    templateUrl: './embedded-report.component.html',
    styleUrls: ['./embedded-report.component.scss'],
})
export class EmbeddedReportComponent implements OnInit, AfterViewInit  {
    @Input() reportId: string;
    @Input() groupId: string;
    @Input() type: string;

    @ViewChild(PowerBIReportEmbedComponent) reportObj!: PowerBIReportEmbedComponent;

    layout: string;
    token;
    user;
    config;
    configDashboard;
    showReport=false;
    report: any;
    pages: any
    handlers;
    settings = {
        visualRenderedEvents: true,
        layoutType: 0,
        background: 0,
        panes: {
            filters: {
                visible: false,
            },
            pageNavigation: {
                visible: false,
            },
        },
    };

    constructor(private embeddedSrv: EmbeddedService, public breakpointObserver: BreakpointObserver) {
        this.handlers =  new Map([
            ['loaded', (): void => console.log('Report loaded')],
            ['rendered', (): void => {
        this.selectItems()
        console.log('Report rendered')}],
            ['error', (event): void => console.log(event.detail)]
        ]);
    }

    ngOnInit(): void {

        this.breakpointObserver
        .observe([Breakpoints.Handset])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            console.log('Viewport width is less than handset!');
            this.settings = {
                ... this.settings,
                    layoutType: 2,
                    background:1,
            };
            // this.report.updateSettings(this.settings);x
          } else {
            this.embeddedSrv.changeHandSetStatus('desktop');
            this.settings = {
                ... this.settings,
                    layoutType: 0,
                    background:0,
            };
            // console.log(this.report)
            // this.report.updateSettings(this.settings);
          }
        });

       this.getEmbedded(this.settings);
       
    }
    ngAfterViewInit(): void {
      if (this.reportObj) {
      }

    }
    async refresh() {
      this.reportObj.getReport().getPages().then((e) => console.log(e))
    }
    fullscreen() {
      this.reportObj.getReport().fullscreen()
    }

    print() {
      this.reportObj.getReport().print()
    }
    selectItems() {
      const get = async () => {

        try {

          const pages = await  this.reportObj.getReport().getPages();
      
          let log = "Report pages:";
      
          this.pages = pages.filter((e) => e.visibility === 0)
          console.log(this.pages)
      }
      
      catch (error) {
      
          console.log(error);
      
        }
      }
      get()
    }
    change(e) {
      this.pages.find((a) => a.name === e).setActive()
    }
    private getEmbedded(settings: any): void {

        this.embeddedSrv.getEmbeddedInfo(
            this.groupId,
            this.reportId
        ).subscribe((res) => {
                this.token = res.EmbedToken;
                this.config = {
                    type: 'report',
                    tokenType: 1,
                    embedUrl: res.EmbedReport[0].EmbedUrl,
                    id: res.EmbedReport[0].ReportId,
                    accessToken: this.token.Token,
                    hostname: 'https://app.powerbi.com',
                    settings: {
                        ... settings
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
