import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
        public fb: FormBuilder,
        private toastr: ToastrService,
        private pageMasterService: PageMasterService
    ) {
        this.requisicoes();
    }

    form = this.fb.group({
        name: ['', Validators.required],
    });

    async requisicoes() {}

    criarGrupo(): void {
        if (!this.form.valid) {
            this.toastr.error('Nome Precisa ser preenchido');
            return;
        }
        this.pageMasterService.postGroup(this.form.value.name).subscribe(
            (res) => {
                this.toastr.success('Grupo criado com sucesso');
                this.router.navigate(['/master/gestao/telas']);
            },
            ({ error }) => {
                this.toastr.error('Falha ao criar grupo');
            }
        );
    }
}
