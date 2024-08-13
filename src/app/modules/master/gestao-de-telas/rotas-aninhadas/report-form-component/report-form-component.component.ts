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
                web_page_link: this.formReport.controls.url.value,
            })
            .subscribe(
                (res) => {
                    this.toastr.success('Rota criada com sucesso');
                    this.voltar();
                },
                ({ error }) => this.toastr.error('Falha ao criar rota')
            );
    }

    voltar() {
        this.router.navigate([
            '/master/gestao/telas/grupo/' + this.form.value.page_group_id,
        ]);
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
}
