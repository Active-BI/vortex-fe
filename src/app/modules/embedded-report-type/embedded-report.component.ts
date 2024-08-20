import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { LogModalComponent } from './log-modal/log-modal.component';
@Component({
    selector: 'app-embedded-report-type',
    templateUrl: './embedded-report.component.html',
    styleUrls: ['./embedded-report.component.scss'],
})
export class EmbeddedReportByTypeComponent implements OnInit {
    @Input() type: string;
    @Input() group: string;
    @Input() report_type: string;
    @Input() hasData: boolean = true;

    @ViewChild('formInputs') formIputFile;
    report_page = new FormControl('');

    selected = new FormControl('');
    dadosParaImportar = [];
    nomeArquivo = '';
    OpcaoPainel(evento) {
        if (evento === 'TelaCheia') this.fullscreen();
        if (evento === 'Imprimir') this.print();
        if (evento === 'Atualizar Dataflow') this.refreshReportDataflow();
        if (evento === 'Atualizar Dataset') this.refreshReport();
        if (evento === 'Exportar') this.Exportar();
        if (evento === 'Baixar Template') this.BaixarTemplate();

        this.selected.reset();
    }
    refreshReport() {
        // this.refresh();
        this.pmiService.refreshDataset(this.group, this.type).subscribe(
            (res) => this.toastr.success('Relatório está sendo Atualizado'),
            ({ error }) => {
                this.toastr.error(error.message);
            }
        );
    }
    refreshReportDataflow() {
        this.pmiService.refreshDataflow(this.group, this.type).subscribe(
            (res) => this.toastr.success('Dataflow está sendo Atualizado'),
            ({ error }) => {
                this.toastr.error(error.message);
            }
        );
    }
    Salvar() {
        if (this.dadosParaImportar.length > 0) {
            this.pmiService
                .uploadFile(this.dadosParaImportar, this.group, this.type)
                .subscribe(
                    (d) => {
                        this.toastr.success('Importação concluída');
                        this.cleanFile();
                        this.refresh();
                    },
                    ({ error }) => {
                        this.toastr.error(error.message);

                        if (error.log) {
                            this.dialog.open(LogModalComponent, {
                                data: {
                                    erro: error.log,
                                    data: () => {
                                        const inputElement: HTMLInputElement =
                                            document.querySelector(
                                                '.input-file'
                                            );
                                        if (inputElement) {
                                            this.cleanFile();
                                            inputElement.value = ''; // Limpar o valor do campo de entrada
                                            this.dadosParaImportar = [];
                                            this.nomeArquivo = '';
                                        }
                                        this.dialog.closeAll();
                                    },
                                },
                            });
                        }
                        this.cleanFile();
                    }
                );
        } else {
            this.toastr.error('Nenhum dado foi importado');
        }
    }
    Exportar() {
        this.pmiService
            .exportDataFile(this.group, this.type)
            .subscribe((data: any) => {
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
        this.pmiService
            .exportExampleFile(this.group, this.type)
            .subscribe((data: any) => {
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
    cleanFile() {
        if (this.dadosParaImportar.length > 0) {
            this.nomeArquivo = '';
            this.dadosParaImportar = [];
            this.formIputFile = '';
            // this.formInputs.nativeElement.value = '';
        }
    }
    @ViewChild('formInputs') formInputs: ElementRef<HTMLInputElement>;

    Importar(e) {
        e.preventDefault();
        this.cleanFile();
        const fileName = e.target.files[0]?.name as string;
        const file = e.target.files[0];
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
            let json = xlsx.utils.sheet_to_json(worksheet, {
                defval: undefined,
            });
            this.dadosParaImportar = json;
            this.formInputs.nativeElement.value = '';
        };
        reader.readAsArrayBuffer(e.target.files[0]);
        this.formInputs.nativeElement.value = '';
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
    contador: number = 0;
    title;
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
        private pmiService: PMIService,
        public dialog: MatDialog
    ) {
        const token = localStorage.getItem('token');

        if (token) {
            this.rlsName = (jwtDecode(token) as any).role_name;
        }
        this.handlers = new Map([
            ['loaded', (): void => {}],
            [
                'pageChanged',
                (event): void => {
                    this.title = event.detail.newPage.displayName;
                    // this.pages.find((page) => page.name === value).setActive();
                },
            ],
            [
                'rendered',
                () => {
                    if (this.pages.length < 1) {
                        this.selectItems();
                    }
                },
            ],
            ['error', (event): void => {}],
        ]);
    }

    ngOnInit(): void {
        this.breakpointObserver
            .observe([Breakpoints.Handset])
            .subscribe((state: BreakpointState) => {
                this.showReport = false;
                if (state.matches) {
                    this.settings = {
                        ...this.settings,
                        layoutType: 2,
                        background: 1,
                    };
                    // this.report.updateSettings(this.settings);
                    this.embeddedSrv.changeHandSetStatus('mobile');
                } else {
                    this.settings = {
                        ...this.settings,
                        layoutType: 0,
                        background: 0,
                    };
                    this.embeddedSrv.changeHandSetStatus('desktop');
                }

                this.config = {
                    ...this.config,
                    settings: this.settings,
                };

                setInterval(() => {
                    this.showReport = true;
                }, 300);
            });

        this.embeddedSrv.handSetEmitter.subscribe((status) => {});

        this.getEmbedded(this.settings);
    }

    async refresh() {
        if (this.report_type.includes('upload')) {
            this.embeddedSrv
                .checkIfReportHasData(this.group, this.type)
                .subscribe((res: boolean) => {
                    this.hasData = res;
                    if (!this.hasData) {
                        this.ngOnInit();
                    }
                });
        }
        if (!this.reportObj.getReport().refresh()) {
            this.ngOnInit();
        }

        this.reportObj
            .getReport()
            .refresh()
            .then((e) => {});
        this.reportObj
            .getReport()
            .reload()
            .then((e) => {});
    }
    fullscreen() {
        this.reportObj.getReport().fullscreen();
    }

    print() {
        this.reportObj.getReport().print();
    }
    selectItems() {
        const get = () => {
            try {
                Promise.all([this.reportObj.getReport().getPages()]).then(
                    (result) => {
                        const pages = result[0];
                        this.pages = pages.filter((e) => e.visibility === 0);
                        this.report_page.setValue(pages[0].name);
                    }
                );
            } catch (error) {}
        };
        get();
    }
    async change(value) {
        await this.pages.find((page) => page.name === value).setActive();
    }

    async changePageFoward() {
        this.contador++;
        if (this.contador > this.pages.length - 1) {
            this.contador = 0;
        }
        await this.pages
            .find((page) => page === this.pages[this.contador])
            .setActive();
    }
    async changePageBackward() {
        this.contador--;
        if (this.contador < 0) {
            this.contador = this.pages.length - 1;
        }
        await this.pages
            .find((page) => page === this.pages[this.contador])
            .setActive();
    }

    private getEmbedded(settings: any): void {
        this.embeddedSrv
            .getEmbeddedReportInfoByType(this.group, this.type)
            .subscribe(
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
