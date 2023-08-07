import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { EmbeddedService } from '../services/embedded/embedded.service';
import { PowerBIReportEmbedComponent } from 'powerbi-client-angular';
import {
    BreakpointObserver,
    BreakpointState,
    Breakpoints,
} from '@angular/cdk/layout';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as xlsx from 'xlsx';
import { PMIService } from '../services/PMI.service';
import jwtDecode from 'jwt-decode';
@Component({
    selector: 'app-embedded-report-type',
    templateUrl: './embedded-report.component.html',
    styleUrls: ['./embedded-report.component.css'],
})
export class EmbeddedReportByTypeComponent implements OnInit, AfterViewInit {
    @Input() type: string;
    form: FormGroup = this.fb.group({
        vision: '',
    });
    selected = new FormControl('');
    dadosParaImportar = [];
    nomeArquivo = '';
    OpcaoPainel(evento) {
        if (evento === 'TelaCheia') this.fullscreen();
        if (evento === 'Imprimir') this.print();
        if (evento === 'Atualizar') this.refreshReport();
        if (evento === 'Exportar') this.Exportar();
        if (evento === 'Baixar Template') this.BaixarTemplate();

        this.selected.reset();
    }
    refreshReport() {
        // this.refresh();
        this.pmiService.refresh(this.type).subscribe(
            (res) => this.toastr.success('Relatório está sendo Atualizado'),
            ({ error }) => {
                this.toastr.error(error.message);
            }
        );
    }
    Salvar() {
        if (this.dadosParaImportar.length > 0) {
            this.pmiService
                .uploadFile(this.dadosParaImportar, this.type)
                .subscribe(
                    (d) => this.toastr.success('Importação concluída'),
                    ({ error }) => {
                        this.toastr.error(error.message);
                    }
                );
        } else {
            this.toastr.error('Nenhum dado foi importado');
        }
    }
    Exportar() {
        this.pmiService.exportDataFile(this.type).subscribe((data: any) => {
            const blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = this.type + '_dados.xlsx';
            link.click();
        });
    }
    BaixarTemplate() {
        this.pmiService.exportExampleFile(this.type).subscribe((data: any) => {
            const blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = this.type + '_template.xlsx';
            link.click();
        });
    }

    Importar(e) {
        e.preventDefault();
        const fileName = e.target.files[0]?.name as string;
        const file = e.target.files[0];
        this.nomeArquivo = '';
        this.dadosParaImportar = [];
        if (Number((file.size / 1024).toFixed(2)) > 1500) {
            this.toastr.error('Excedeu tamanho máximo de 1,5 Mb');
            return;
        }

        const reader: FileReader = new FileReader();
        reader.onload = (): void => {
            if (!fileName.endsWith('.xlsx')) {
                this.toastr.error('Extensão inválida');
                return;
            }
            this.nomeArquivo = fileName.substring(0, 20) + '...';

            const data = reader.result;
            const workbook = xlsx.read(data, {
                type: 'array',
                cellDates: true,
            });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            let json = xlsx.utils.sheet_to_json(worksheet, { defval: null });
            this.dadosParaImportar = json;
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
    @ViewChild(PowerBIReportEmbedComponent)
    reportObj!: PowerBIReportEmbedComponent;

    layout: string;
    token;
    user;
    config;
    configDashboard;
    showReport = false;
    report: any;
    pages: any = [];
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
    rlsName = '';
    constructor(
        private embeddedSrv: EmbeddedService,
        public breakpointObserver: BreakpointObserver,
        private toastr: ToastrService,
        private fb: FormBuilder,
        private pmiService: PMIService
    ) {
        const token = localStorage.getItem('token');
        if (token) {
            this.rlsName = (jwtDecode(token) as any).role_name;
          
        }
        this.handlers = new Map([
            ['loaded', (): void => console.log('Report loaded')],
            [
                'rendered',
                (): void => {
                    if (this.pages.length < 1) {
                        this.selectItems();
                    }
                    console.log('Report rendered');
                },
            ],
            ['error', (event): void => console.log(event.detail)],
        ]);
    }

    ngOnInit(): void {
        this.breakpointObserver
            .observe([Breakpoints.Handset])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    console.log('Viewport width is less than handset!');
                    this.settings = {
                        ...this.settings,
                        layoutType: 2,
                        background: 1,
                    };
                    // this.report.updateSettings(this.settings);x
                } else {
                    this.embeddedSrv.changeHandSetStatus('desktop');
                    this.settings = {
                        ...this.settings,
                        layoutType: 0,
                        background: 0,
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
        this.reportObj
            .getReport()
            .getPages()
            .then((e) => console.log(e));
    }
    fullscreen() {
        this.reportObj.getReport().fullscreen();
    }

    print() {
        this.reportObj.getReport().print();
    }
    selectItems() {
        const get = async () => {
            try {
                const pages = await this.reportObj.getReport().getPages();

                this.pages = pages.filter((e) => e.visibility === 0);
                this.form.patchValue({
                    vision: this.pages[0].name,
                });
            } catch (error) {
                console.log(error);
            }
        };
        get();
    }
    change({ value: name }) {
        this.pages.find((a) => a.name === name).setActive();
    }
    private getEmbedded(settings: any): void {
        this.embeddedSrv.getEmbeddedReportInfoByType(this.type).subscribe(
            (res) => {
                this.token = res.embedToken;
                this.config = {
                    type: 'report',
                    tokenType: 1,
                    embedUrl: res.reportsDetail[0].embedUrl,
                    id: res.reportsDetail[0].reportId,
                    accessToken: this.token.token,
                    hostname: 'https://app.powerbi.com',
                    settings: {
                        ...settings,
                    },
                };
                this.configDashboard = {
                    type: 'dashboard',
                    tokenType: 1,
                    embedUrl: res.reportsDetail[0].embedUrl,
                    id: res.reportsDetail[0].reportId,
                    accessToken: this.token.token,
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
