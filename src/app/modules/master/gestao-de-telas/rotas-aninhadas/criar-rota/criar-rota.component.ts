import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupMasterService } from 'app/modules/services/group-master.service';
import { PageMasterService } from 'app/modules/services/page-master.service';
import { ToastrService } from 'ngx-toastr';
import { agregarRoles } from '../rotas-aninhadas.component';

export const screenTypes = {
    DASHBOARD: 'dashboard',
    REPORT: 'report',
    REPORT_UPLOAD: 'report-upload',
    DASHBOARD_UPLOAD: 'dashboard-upload',
    PAGE: 'page',
};
const ROLES = {
    User: 'ca21241b-a37d-4e6f-bbb6-26643d3cdd99',
    Admin: '6a203390-8389-49ca-aa0e-6a14ba7815bc',
};
export const roles = [
    {
        name: 'User',
        id: ROLES.User,
    },
    {
        name: 'Admin',
        id: ROLES.Admin,
    },
];

@Component({
    selector: 'app-criar-rota',
    templateUrl: './criar-rota.component.html',
    styleUrls: ['./criar-rota.component.scss'],
})
export class CriarRotaComponent implements OnInit {
    groupId = '';
    page_context = 'criar';
    screenType = Object.values(screenTypes);
    roles = roles;
    constructor(
        public dialog: MatDialog,
        public fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private pageMasterService: PageMasterService,
        private groupMasterService: GroupMasterService,
        private toastr: ToastrService
    ) {
        this.groupId = this.route.snapshot.paramMap.get('groupId');
        this.page_context = this.router.url.includes('criar')
            ? 'criar'
            : 'editar';
        this.requisicoes();
    }
    async requisicoes() {
        const acessos = agregarRoles(
            await this.groupMasterService.getGroup(this.groupId)
        );
        this.form.patchValue({
            page_group_title: acessos.page_group,
        });
    }

    voltar() {
        this.groupId.length > 0
            ? this.router.navigate([
                  '/master/gestao/telas/grupo/' + this.groupId,
              ])
            : this.router.navigate(['/master/gestao/telas/']);
    }
    form = this.fb.group({
        id: [''],
        page_type: ['report', [Validators.required]],
        title: ['', [Validators.required]],
        link: [''],
        type: ['basic'],
        formated_title: [''],
        group_id: [''],
        report_id: [''],
        restrict: [false],
        table_name: [''],
        page_group_title: ['', [Validators.required]],
        page_group_id: [this.groupId, [Validators.required]],
        possui_dados_sensiveis: [false, [Validators.required]],
        descricao_painel: ['', [Validators.required]],
        nome_responsavel: ['', [Validators.required]],
        email_responsavel: ['', [Validators.required, Validators.email]],
        roles: [[], [Validators.required]],
    });
    ngOnInit(): void {
        this.form.patchValue({
            page_group_id: this.groupId,
        });
        this.change();
    }
    findRole(id) {
        if (id) {
            return this.roles.find((r) => r.id === id).name;
        }
        return '';
    }
    change() {
        const pathByGroup = this.form.value.page_group_title
            .toLowerCase()
            .split(' ')
            .join('-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        const title = this.form.value.title
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
        if (!this.form.valid) {
            this.toastr.error('Formulário inválido');
            return;
        }
        const { page_group_title, possui_dados_sensiveis, id, ...args } =
            this.form.value;
        this.pageMasterService.postPage(args).subscribe(
            (res) => {
                this.toastr.success('Rota criada com sucesso');
                this.router.navigate([
                    '/master/gestao/telas/grupo/' + this.groupId,
                ]);
            },
            ({ error }) => this.toastr.error('Falha ao criar rota')
        );
    }
}
