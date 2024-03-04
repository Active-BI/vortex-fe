import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalAuthService } from 'app/modules/services/auth.service';
import { PageService } from 'app/modules/services/page.service';
import { SocketService } from 'app/modules/services/socket.service';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-tfa',
    templateUrl: './tfa.component.html',
    styleUrls: ['./tfa.component.scss'],
})
export class TfaComponent implements OnInit {
    showAlert: boolean = false;
    tfaForm;
    /**
     * Constructor
     */
    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private authService: LocalAuthService,
        private socketService: SocketService
    ) {
        this.app_image = localStorage.getItem('app_image')
        this.bg_color = localStorage.getItem('bg_color')
        this.logo = localStorage.getItem('logo')
        this.authService.get_app_image().subscribe(res => {
            localStorage.setItem('app_image', res.app_image)
            localStorage.setItem('bg_color', res.bg_color)
            localStorage.setItem('logo', res.tenant_image)
            this.app_image = res.app_image
            this.logo = res.tenant_image
            this.bg_color = res.bg_color
        }, ({error}) => {   

        })
    }
    bg_color =''
    app_image =''
    logo = ''

    validate() {
        try {
            jwtDecode(localStorage.getItem('tempToken'), {
                header: true,
            });
        } catch (e) {
            localStorage.clear();
            this.router.navigate(['/sign-in']);
        }
    }
    ngOnInit() {
        this.validate();
        this.tfaForm = this.fb.group({
            tfa: ['', [Validators.required, Validators.maxLength(7)]],
        });

        this.tfaForm.get('tfa').valueChanges.subscribe((value) => {
            if (value.length === 6) {
                this.authService
                    .tfa({pin: value})
                    .subscribe(async (res) => {
                        Promise.all([
                            localStorage.setItem(
                                'token',
                                JSON.stringify(res.token)
                            ),
                            localStorage.setItem(
                                'tenant_color',
                                JSON.stringify(res.tenant_color)
                            ),
                            localStorage.setItem(
                                'tenant_image',
                                JSON.stringify(res.tenant_image)
                            ),
                            localStorage.setItem(
                                'session_id',
                                res.user_email
                            ),
                            localStorage.setItem(
                                'tenant_id',
                                res.tenant_id
                            ),
                            this.socketService.Logeddin(res.user_email, res.token)
                        ]).then(() => {
                 
                                localStorage.removeItem('tempToken');
                                setTimeout(() => {
                                    this.redirect();
                                }, 500);
                        });
                    });
            }
        });
    }
    valilateSpecialCharacterPassword(control: FormControl) {
        // verifica se existe algum caractere especial
        return !(control.value as string).match(/^[a-zA-Z0-9\s]*$/)
            ? true
            : { specialChar: true };
    }
    valilateUpperCaseLetter(control: FormControl) {
        // verifica se existe letra maiuscula

        return /[A-Z]/.test(control.value as string)
            ? true
            : { UpperCaseLetter: true };
    }
    redirect(): void {
        this.router.navigate(['/app/inicio']);
    }
    signUp(): void {
        if (this.tfaForm.invalid) {
            this.toastr.error('Erro no formulário!');
            return;
        }

        const form = this.tfaForm.value;
    }
}
