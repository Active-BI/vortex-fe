import { Component, Input, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { roles } from '../criar-rota/criar-rota.component';
import { ToastrService } from 'ngx-toastr';
import { PageMasterService } from 'app/modules/services/page-master.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-report-form-component',
    templateUrl: './report-form-component.component.html',
    styleUrls: ['./report-form-component.component.scss'],
})
export class ReportFormComponentComponent implements OnInit {
    roles = roles;
    @Input() form: FormGroup = this.fb.group({});
    @Input() groupId: String = '';

    formReport = this.fb.group(
        {
            id: [''],
            page_type: ['', [Validators.required]],
            title: ['', [Validators.required]],
            url: ['', [Validators.required]],
            group_id: ['', [Validators.required]],
            report_id: ['', [Validators.required]],
            roles: [[], [Validators.required]],
            descricao_painel: [''],
            possui_dados_sensiveis: [false],
        },
        { validators: this.validateUrlBasedOnGroupAndReport }
    );

    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private pageMasterService: PageMasterService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.form.controls.title.valueChanges.subscribe((title) => {
            this.change(title);
        });

        this.form.valueChanges.subscribe((value) => {
            this.formReport.patchValue({
                id: value.id,
                title: value.title,
                page_type: value.page_type,
            });
        });
    }

    urlSeparator() {
        var url_separada = this.formReport.controls.url.value.split('/');

        if (
            url_separada.indexOf('groups') !== -1 &&
            url_separada.indexOf('reports') !== -1
        ) {
            this.formReport.patchValue({
                group_id: url_separada[url_separada.indexOf('groups') + 1],
                report_id: url_separada[url_separada.indexOf('reports') + 1],
            });
        } else {
            this.formReport.patchValue({
                group_id: '',
                report_id: '',
            });
        }
    }

    findRole(id) {
        if (id) {
            return this.roles.find((r) => r.id === id).name;
        }
        return '';
    }

    criarDashboardAndReport() {
        if (this.formReport.invalid) {
            this.formReport.markAllAsTouched();
            this.toastr.error('Formulário inválido');
            return;
        }
        this.form.patchValue({
            group_id: this.formReport.value.group_id,
            report_id: this.formReport.value.report_id,
            roles: this.formReport.value.roles,
            descricao_painel: this.formReport.value.descricao_painel,
            possui_dados_sensiveis:
                this.formReport.value.possui_dados_sensiveis,
        });
        const { page_group_title, possui_dados_sensiveis, id, ...args } =
            this.form.value;

        this.pageMasterService
            .postPage({
                ...args,
            })
            .subscribe(
                (res) => {
                    this.toastr.success('Rota criada com sucesso');
                    this.voltar();
                },
                ({ error }) => {
                    this.toastr.error(error.message);
                }
            );
    }

    voltar() {
        this.router.navigate(['/master/gestao/telas/grupo/' + this.groupId]);
    }

    validateUrlBasedOnGroupAndReport(
        formGroup: FormGroup
    ): ValidationErrors | null {
        const groupId = formGroup.get('group_id');
        const reportId = formGroup.get('report_id');
        const url = formGroup.get('url');

        if (groupId?.valid && reportId?.valid) {
            url?.setErrors(null);
        } else {
            url?.setErrors({ invalidBasedOnGroupAndReport: true });
        }

        return null;
    }

    change(input_title) {
        const pathByGroup = this.form.value.page_group_title
            .toLowerCase()
            .split(' ')
            .join('-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        const title = input_title
            .toLowerCase()
            .split(' ')
            .join('-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        this.form.patchValue({
            formated_title: title,
        });

        let pathByType = '';
        const isReportTypeNull = this.form.value.page_type === null;
        if (isReportTypeNull) {
            this.form.patchValue({
                page_type: 'report',
            });
        }
        if (
            this.form.value.page_type.includes('report') ||
            this.form.value.page_type.includes('dashboard')
        ) {
            pathByType = this.form.value.page_type.includes('report')
                ? pathByType + 'view-report/'
                : pathByType + 'view-dashboard/';
        }
        if (this.form.value.restrict) {
            pathByType = '/master/' + pathByType;
        }

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
}
