import { Component, OnInit } from '@angular/core';
import { CriarRotaComponent } from '../criar-rota/criar-rota.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupMasterService } from 'app/modules/services/group-master.service';
import { ToastrService } from 'ngx-toastr';
import { PageMasterService } from 'app/modules/services/page-master.service';

@Component({
    selector: 'app-webpage-form-component',
    templateUrl: './webpage-form-component.component.html',
    styleUrls: ['./webpage-form-component.component.scss'],
})
export class WebpageFormComponentComponent
    extends CriarRotaComponent
    implements OnInit
{
    formWebPage: FormGroup = this.formb.group({
        id: [''],
        page_type: ['', [Validators.required]],
        title: ['', [Validators.required]],
        url: ['', [Validators.required]],
        roles: [[], Validators.required],
    });

    constructor(
        public _dialog: MatDialog,
        public _fb: FormBuilder,
        public _route: ActivatedRoute,
        public _router: Router,
        public _groupMasterService: GroupMasterService,
        private toastr: ToastrService,
        private formb: FormBuilder,
        private pageMasterService: PageMasterService
    ) {
        super(_dialog, _fb, _route, _router, _groupMasterService);
    }

    ngOnInit(): void {
        this.form.valueChanges.subscribe((value) => {
            this.formWebPage.patchValue({
                id: value.id,
                title: value.title,
                page_type: value.page_type,
            });
        });
    }

    async criarWebPage() {
        console.log(this.form);
        console.log(this.formWebPage);

        if (this.formWebPage.invalid) {
            this.formWebPage.markAllAsTouched();
            this.toastr.error('formaulário inválido');
            return;
        }

        this.form.patchValue({
            roles: this.formWebPage.value.roles,
            possui_dados_sensiveis:
                this.formWebPage.value.possui_dados_sensiveis,
        });
        const { page_group_title, possui_dados_sensiveis, id, ...args } =
            this.form.value;

        this.pageMasterService
            .postPage({
                ...args,
                web_page_link: this.formWebPage.value.url,
            })
            .subscribe(
                (res) => {
                    this.toastr.success('Rota criada com sucesso');
                    this.voltar();
                },
                ({ error }) => this.toastr.error('Falha ao criar rota')
            );
    }
}
