import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService, PreRegister } from 'app/modules/services/admin.service';
import { MenuService } from 'app/modules/services/menu.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-menus-create',
    templateUrl: './menus-create.component.html',
    styleUrls: ['./menus-create.component.scss'],
})
export class MenusCreateComponent {
    value = '';
    constructor(
        private fb: FormBuilder,
        private router: Router,
        // route: ActivatedRoute,
        private menuService: MenuService,
        private toast: ToastrService
    ) {}

    form = this.fb.group({
        report_id: ['', [Validators.required]],
        group_id: ['', [Validators.required]],
        title: ['', [Validators.required]],
        link: ['', [Validators.required]],
        icon: [''],
        type: ['', [Validators.required]],
    });
    voltar() {
        this.router.navigate(['/app/menus']);
    }
    criar(): void {
        if (this.form.valid) {
            const formPayload = this.form.value as PreRegister;
            this.menuService.postMenus(formPayload).subscribe((e) => {
                this.toast.success('Rota Criada com Sucesso');
                this.voltar();
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
