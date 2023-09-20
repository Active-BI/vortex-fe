import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMasterService } from 'app/modules/services/page-master.service';
import { ToastrService } from 'ngx-toastr';

export const screenTypes = {
    DASHBOARD: 'dashboard',
    REPORT: 'report',
    REPORT_UPLOAD: 'report-upload',
    DASHBOARD_UPLOAD: 'dashboard-upload',
    PAGE: 'page',
};

@Component({
    selector: 'app-criar-rota',
    templateUrl: './criar-rota.component.html',
    styleUrls: ['./criar-rota.component.scss'],
})
export class CriarRotaComponent implements OnInit {
    groupId = '';
    page_context = 'criar';
    screenType = Object.values(screenTypes);
    constructor(
        public dialog: MatDialog,
        public fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private pageMasterService: PageMasterService,
        private toastr: ToastrService
    ) {
        this.groupId = this.route.snapshot.paramMap.get('groupId');
        this.page_context = this.router.url.includes('criar')
            ? 'criar'
            : 'editar';
    }
    voltar() {
        this.groupId.length > 0
            ? this.router.navigate([
                  '/master/gestao/telas/grupo/' + this.groupId,
              ])
            : this.router.navigate(['/master/gestao/telas/']);
    }
    form = this.fb.group({
        id: ['', [Validators.required]],
        report_type: ['report', [Validators.required]],
        title: ['', [Validators.required]],
        link: [''],
        type: ['basic'],
        group_id: [''],
        report_id: [''],
        restrict: [false, [Validators.required]],
        table_name: [''],
        page_group_title: ['', [Validators.required]],
        page_group_id: [this.groupId, [Validators.required]],
        possui_dados_sensiveis: ['', [Validators.required]],
        descricao_painel: ['', [Validators.required]],
        responsavel: ['', [Validators.required]],
    });
    ngOnInit(): void {
        this.form.patchValue({
            page_group_id: this.groupId,
        });
    }
    change() {
        const pathByGroup = this.form.value.page_group_title
            .toLowerCase()
            .split(' ')
            .join('-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        console.log({ pathByGroup, typeof: typeof pathByGroup });
        const title = this.form.value.title
            .toLowerCase()
            .split(' ')
            .join('-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        let pathByType = '';
        const isReportTypeNull = this.form.value.report_type === null;
        if (isReportTypeNull) {
            this.form.patchValue({
                report_type: 'report',
            });
        }
        if (
            this.form.value.report_type.includes('report') ||
            this.form.value.report_type.includes('dashboard')
        ) {
            pathByType = this.form.value.report_type.includes('report')
                ? pathByType + 'view-report/'
                : pathByType + 'view-dashboard/';
        }
        if (this.form.value.restrict) {
            pathByType = '/master/' + pathByType;
        }
        console.log(pathByGroup);
        if (pathByGroup === '') {
            this.form.patchValue({
                link: `${pathByType}${title}`,
            });
        } else {
            this.form.patchValue({
                link: `${pathByType}${pathByGroup}/${title}`,
            });
        }
    }
    criarRota() {
        if (this.form.valid) {
            this.toastr.error('Formulário inválido');
        }
        const { page_group_title, possui_dados_sensiveis, id, ...args } =
            this.form.value;
        this.pageMasterService.postPage(args).subscribe(
            (res) => {
                this.toastr.success('Rota criada com sucesso');
                this.router.navigate(['/master/gestao/telas/']);
            },
            ({ error }) => this.toastr.error('Falha ao criar rota')
        );
    }
}
