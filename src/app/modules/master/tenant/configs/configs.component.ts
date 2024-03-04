import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'app/modules/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-configs',
    templateUrl: './configs.component.html',
    styleUrls: ['./configs.component.scss'],
})
export class ConfigsComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private userSrv: UserService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.userSrv.obterConfiguracoesDePagina().subscribe((res) => {
            this.form.patchValue({
                ...res,
            });
        });
    }
    form = this.fb.group({
        logo: ['', [Validators.required]],
        bg_image: ['', [Validators.required]],
        bg_color: ['', [Validators.required]],
    });

    onColorSelected(color: string, label) {
        this.form.patchValue({
            [label]: color,
        });
    }
    clearLogoFileSelection() {
        this.form.patchValue({
            logo: '',
        });
    }
    clearBgImageFileSelection() {
        this.form.patchValue({
            bg_image: '',
        });
    }
    onFileLogoSelected(event: any) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.form.patchValue({
                    logo: reader.result as string,
                });
            };

            reader.readAsDataURL(file);
        }
    }
    salvar() {
        this.userSrv.salvarConfiguracoesDePagina(this.form.value).subscribe(
            (res) => {
                this.toastr.success('Configurações salvas com sucesso');
            },
            ({ error }) => {
                this.toastr.error('Falha ao atualizar configurações');
            }
        );
    }

    onBgImageFileSelected(event: any) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.form.patchValue({
                    bg_image: reader.result as string,
                });
            };

            reader.readAsDataURL(file);
        }
    }
}
