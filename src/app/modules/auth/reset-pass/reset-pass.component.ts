import { Component, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    NgForm,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { LocalAuthService } from 'app/modules/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-reset-pass',
    templateUrl: './reset-pass.component.html',
    styleUrls: ['./reset-pass.component.scss'],
})
export class ResetPassComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;
    signUpForm: FormGroup;
    token = '';
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };

    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private _router: Router,
        private authService: LocalAuthService
    ) {
        this.token = this.route.snapshot.paramMap.get('token');
        this.signUpForm = this._formBuilder.group({
            passwordConfirm: ['', [Validators.required]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    this.valilateSpecialCharacterPassword,
                    this.valilateUpperCaseLetter,
                ],
            ],
        });
        this.app_image = localStorage.getItem('app_image')
        this.bg_color = localStorage.getItem('bg_color')
        this.logo = localStorage.getItem('logo')
        this.authService.get_app_image().subscribe(res => {
            localStorage.setItem('app_image', res.app_image)
            localStorage.setItem('bg_color', res.bg_color)
            localStorage.setItem('logo', res.tenant_image)
            this.app_image = res.app_image
            this.bg_color = res.bg_color
            this.logo = res.tenant_image
        }, ({error}) => {   

        })
    }
    bg_color =''
    app_image =''
    logo = ''
    ngOnInit(): void {}

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
    resetIsValid() {
        if (this.signUpForm.invalid) {
            return true;
        }
        if (
            this.signUpForm.value.passwordConfirm !==
            this.signUpForm.value.password
        ) {
            return true;
        }
        return false;
    }
    reset(): void {
        if (this.signUpForm.invalid) {
            this.toastr.error('Erro no formulário!');
            return;
        }

        const form = { ...this.signUpForm.value, token: this.token };
        delete form.passwordConfirm;

        this.authService.setNewPass(form).subscribe(
            (response) => {
                this.signUpForm.enable();
                this.signUpNgForm.resetForm();
                this.toastr.success('Mudança de senha concluída');

                this._router.navigateByUrl('/auth/sign-in');
            },
            (response) => {
                // Re-enable the form
                // this.signUpForm.enable();
                // // Reset the form
                // this.signUpNgForm.resetForm();
                // // Show the alert
                // this.showAlert = true;
            }
        );
    }
}
