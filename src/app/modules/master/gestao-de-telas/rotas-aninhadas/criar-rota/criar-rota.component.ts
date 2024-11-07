import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupMasterService } from 'app/modules/services/group-master.service';
import { PageMasterService } from 'app/modules/services/page-master.service';
import { ToastrService } from 'ngx-toastr';
import { agregarRoles } from '../rotas-aninhadas.component';

export const screenTypes = {
    DASHBOARD: 'dashboard',
    REPORT: 'report',
    WEB_PAGE: 'web-page',
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
    url = new FormControl('', [Validators.required]);

    form = this.fb.group({
        id: [''],
        page_type: ['report', [Validators.required]],
        title: ['', [Validators.required]],
        link: ['', [Validators.required]],
        type: ['basic'],
        formated_title: [''],
        group_id: [''],
        report_id: [''],
        restrict: [false],
        table_name: [''],
        page_group_title: ['', Validators.required],
        page_group_id: [this.groupId],
        possui_dados_sensiveis: [false],
        descricao_painel: [''],
        nome_responsavel: [''],
        email_responsavel: [''],
        roles: [[], [Validators.required]],
        has_RLS: [],
    });

    constructor(
        public dialog: MatDialog,
        public fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private groupMasterService: GroupMasterService
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

    ngOnInit(): void {
        this.form.patchValue({
            page_group_id: this.groupId,
        });
    }

    findRole(id) {
        if (id) {
            return this.roles.find((r) => r.id === id).name;
        }
        return '';
    }
}
