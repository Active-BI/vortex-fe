import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMasterService } from 'app/modules/services/page-master.service';
import { CriarRotaComponent } from './criar-rota.component';
import { ToastrService } from 'ngx-toastr';
import { GroupMasterService } from 'app/modules/services/group-master.service';

@Component({
    selector: 'app-criar-rota',
    templateUrl: './editar-rota.component.html',
    styleUrls: ['./criar-rota.component.scss'],
})
export class EditarRotaComponent extends CriarRotaComponent {
    screenId = '';
    constructor(
        public _route: ActivatedRoute,
        public dialog: MatDialog,
        public fb: FormBuilder,
        private _pageMasterService: PageMasterService,
        private _groupMasterService: GroupMasterService,
        _router: Router,
        private _toastr: ToastrService
    ) {
        super(dialog, fb, _route, _router, _groupMasterService);
        this.screenId = this._route.snapshot.paramMap.get('screenId');
        this.requisicoes();
    }
    async requisicoes() {
        this.form.controls.title.valueChanges.subscribe((title) => {
            this.change(title);
        });
        this._pageMasterService.getPage(this.screenId).subscribe((res) => {
            this.form.patchValue({
                ...res,
                page_group_id: res.Page_Group.id,
                page_group_title: res.Page_Group.title,
                roles: res.Page_Role.map((p) => p.Rls.id),
            });

            if (res.page_type === 'web-page') {
                this.url.patchValue(res.web_page_link);
            }
        });
    }
    editarRota() {
        const { page_group_title, page_group_id, ...dados } = this.form.value;
        if (!this.form.valid) {
            this._toastr.error('Dados inválidos');
            return;
        }
        this._pageMasterService
            .patchPages(dados.id, { ...dados, web_page_link: this.url.value })
            .subscribe(
                (res) => this._toastr.success('Rota edtada com sucesso'),
                ({ error }) => {
                    this._toastr.error('Falha ao atualizar rota');
                }
            );
    }

    change(input_title) {
        console.log(input_title);
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
            console.log(`${pathByType}${pathByGroup}/${title}`);
        }
    }
}
