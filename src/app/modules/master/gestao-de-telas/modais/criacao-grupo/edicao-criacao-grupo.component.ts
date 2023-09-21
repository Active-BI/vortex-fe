import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMasterService } from 'app/modules/services/page-master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-edicao-criacao-grupo',
    templateUrl: './edicao-criacao-grupo.component.html',
    styleUrls: ['./edicao-criacao-grupo.component.scss'],
})
export class EdicaoCriacaoGrupoComponent {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data,
        public fb: FormBuilder,
        private toastr: ToastrService,
        private pageMasterService: PageMasterService
    ) {
        this.requisicoes();
    }

    form = this.fb.group({
        title: ['', Validators.required],
        icon: ['', Validators.required],
    });

    async requisicoes() {}

    criarGrupo(): void {
        if (!this.form.valid) {
            this.toastr.error('Nome Precisa ser preenchido');
            return;
        }
        this.form.value.title;
        this.pageMasterService.postGroup(this.form.value).subscribe(
            (res) => {
                this.dialog.closeAll();
                this.toastr.success('Grupo criado com sucesso');
                this.router.navigate(['/master/gestao/telas']);
                this.data.data();
            },
            ({ error }) => {
                this.toastr.error('Falha ao criar grupo');
            }
        );
    }
}
