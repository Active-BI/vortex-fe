import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMasterService } from 'app/modules/services/page-master.service';
import { ToastrService } from 'ngx-toastr';

const screenTypes = {
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
    screenType = Object.values(screenTypes);
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public fb: FormBuilder,
        private toastr: ToastrService,
        private pageMasterService: PageMasterService
    ) {
        this.groupId = this.route.snapshot.paramMap.get('groupId');
    }
    form = this.fb.group({
        id: ['', [Validators.required]],
        type: ['report', [Validators.required]],
        title: ['', [Validators.required]],
        link: [''],
        group_id: [''],
        report_id: [''],
        restrict: [false, [Validators.required]],
        table_name: [''],
        page_group_id: ['', [Validators.required]],
        possui_dados_sensiveis: ['', [Validators.required]],
        descricao_painel: ['', [Validators.required]],
        responsavel: ['', [Validators.required]],
    });
    ngOnInit(): void {}
    change() {
        const pathByGroup = this.form.value.page_group_id;
        const title = this.form.value.title;
        let pathByType;
        if (
            this.form.value.type.includes('report') ||
            this.form.value.type.includes('dashboard')
        ) {
            pathByType = this.form.value.type.includes('report')
                ? 'view-report'
                : 'view-dashboard';
        }
        if (this.form.value.restrict) {
            pathByType = 'master' + '/' + pathByType;
        } else {
            pathByType = pathByType;
        }
        this.form.patchValue({
            link: `${pathByType}/${pathByGroup}/${title}`,
        });
    }
    criarRota() {}
}
