import { Component, Input, OnInit } from '@angular/core';
import { CriarRotaComponent, roles } from '../criar-rota/criar-rota.component';
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
    implements OnInit
{
    @Input() form: FormGroup = this.fb.group({});
    @Input() groupId: string = '';
    roles = roles;
    
    formWebPage: FormGroup = this.fb.group({
        id: [''],
        page_group_id: [this.groupId],
        page_type: ['', [Validators.required]],
        type: ['basic'],
        title: ['', [Validators.required]],
        url: ['', [Validators.required]],
        roles: [[], Validators.required],
    });

    constructor(
        public dialog: MatDialog,
        public fb: FormBuilder,
        public route: ActivatedRoute,
        public router: Router,
        public groupMasterService: GroupMasterService,
        private toastr: ToastrService,
        private pageMasterService: PageMasterService
    ) {
     }

    ngOnInit(): void {
        this.form.valueChanges.subscribe((value) => {
            this.formWebPage.patchValue({
                page_group_id: this.groupId,
                id: value.id,
                title: value.title,
                page_type: value.page_type,
            });
        });
    }

    voltar() {
        this.groupId.length > 0
            ? this.router.navigate([
                  '/master/gestao/telas/grupo/' + this.groupId,
              ])
            : this.router.navigate(['/master/gestao/telas/']);
    }

    
    findRole(id) {
        if (id) {
            return this.roles.find((r) => r.id === id).name;
        }
        return '';
    }
    async criarWebPage() {
        if (this.formWebPage.invalid) {
            this.formWebPage.markAllAsTouched();
            this.toastr.error('formaulário inválido');
            return;
        }
        const { url, ...args } = this.formWebPage.value;
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
                ({ error }) => this.toastr.error(error.message)
            );
    }
}
