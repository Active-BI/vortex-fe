import { Component, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    NgForm,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/modules/services/auth.service';
import { PageService } from 'app/modules/services/page.service';
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
        private authService: AuthService,
        private pageService: PageService
    ) {}
    ngOnInit(): void {
        this.tfaForm = this.fb.group({
            tfa: ['', [Validators.required, Validators.maxLength(7)]],
        });

        this.tfaForm.get('tfa').valueChanges.subscribe((value) => {
            if (value.length === 6) {
                this.authService
                    .tfa({
                        pin: value,
                        token: localStorage.getItem('tempToken'),
                    })
                    .subscribe((res) => {
                        Promise.all([
                            localStorage.setItem(
                                'token',
                                JSON.stringify(res.token)
                            ),
                        ]).then(() => {
                            const token = jwtDecode(res.token) as any;
                            Promise.all([
                                this.pageService
                                    .getDashboardsByUserId(token.userId)
                                    .then((rotas: any) => {
                                        const dashUsers = rotas;
                                        localStorage.setItem(
                                            'userRoutes',
                                            JSON.stringify(dashUsers)
                                        );
                                    })
                                    .then(() => this.redirect()),
                            ]);
                            localStorage.setItem(
                                'token',
                                JSON.stringify(res.token)
                            );
                            localStorage.removeItem('tempToken');
                            this.redirect();
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
