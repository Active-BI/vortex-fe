import { Component, OnInit } from '@angular/core';
import { CriarRotaComponent } from '../criar-rota/criar-rota.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupMasterService } from 'app/modules/services/group-master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-webpage-form-component',
    templateUrl: './webpage-form-component.component.html',
    styleUrls: ['./webpage-form-component.component.scss'],
})
export class WebpageFormComponentComponent
    extends CriarRotaComponent
    implements OnInit
{
    formWebPage = this.formb.group({
        id: [''],
        page_type: ['', [Validators.required]],
        title: ['', [Validators.required]],
        url: ['', [Validators.required]],
        roles: [[], Validators.required],
        possui_dados_sensiveis: [false],
    });

    constructor(
        public _dialog: MatDialog,
        public _fb: FormBuilder,
        public _route: ActivatedRoute,
        public _router: Router,
        public _groupMasterService: GroupMasterService,
        private toastr: ToastrService,
        private formb: FormBuilder
    ) {
        super(_dialog, _fb, _route, _router, _groupMasterService);
    }

    ngOnInit(): void {}

    async criarWebPage() {}
}
