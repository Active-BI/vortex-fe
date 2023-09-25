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
        super(
            dialog,
            fb,
            _route,
            _router,
            _pageMasterService,
            _groupMasterService,
            _toastr
        );
        this.screenId = this._route.snapshot.paramMap.get('screenId');
        this.requisicoes();
    }
    async requisicoes() {
        const {
            id,
            title,
            link,
            group_id,
            report_id,
            restrict,
            table_name,
            page_group_id,
            possui_dados_sensiveis,
            descricao_painel,
            report_type,
            responsavel,
            Page_Role,
            Page_Group: { title: page_group_title },
        }: any = await this._pageMasterService.getPageById(this.screenId);

        this.form.patchValue({
            id,
            title,
            page_group_title,
            link,
            report_type,
            group_id,
            report_id,
            restrict,
            table_name,
            page_group_id,
            possui_dados_sensiveis,
            descricao_painel,
            responsavel,
            roles: Page_Role.map((p) => p.Rls.id),
        });

        this.change();
    }
    editarRota() {
        const { page_group_title, page_group_id, ...dados } = this.form.value;
        if (!this.form.valid) {
            this._toastr.error('Dados inválidos');
            return;
        }
        this._pageMasterService.patchPages(dados.id, dados).subscribe(
            (res) => this._toastr.success('Rota edtada com sucesso'),
            ({ error }) => {
                this._toastr.error('Falha ao atualizar rota');
            }
        );
    }
}
