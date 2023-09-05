import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageMasterService } from 'app/modules/services/page-master.service';
import { CriarRotaComponent } from './criar-rota.component';

@Component({
    selector: 'app-criar-rota',
    templateUrl: './criar-rota.component.html',
    styleUrls: ['./criar-rota.component.scss'],
})
export class EditarRotaComponent extends CriarRotaComponent {
    screenId = '';
    constructor(
        public _route: ActivatedRoute,
        public dialog: MatDialog,
        public fb: FormBuilder,
        private pageMasterService: PageMasterService
    ) {
        super(dialog, fb, _route);
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
            report_type,
            table_name,
            page_group_id,
            possui_dados_sensiveis,
            descricao_painel,
            responsavel,
        }: any = await this.pageMasterService.getPageById(this.screenId);
        this.form.patchValue({
            id,
            title,
            link,
            report_type: 'report',
            group_id,
            report_id,
            restrict,
            table_name,
            page_group_id,
            possui_dados_sensiveis,
            descricao_painel,
            responsavel,
        });
    }
}
