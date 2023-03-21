import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    NgForm,
    Validators,
    AbstractControl,
    FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/modules/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

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
        private _router: Router,
        private authService: AuthService
    ) {}
    ngOnInit(): void {}

    signUpForm = this._formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
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
    valilateIfPasswordAreEquals() {
        const password = this.signUpForm.value['password'];
        const passwordConfirm = this.signUpForm.value['passwordConfirm'];

        if (password !== passwordConfirm)
            this.signUpForm.controls['passwordConfirm'].setErrors({
                PassNotEqual: true,
            });
    }

    signUp(): void {
        if (this.signUpForm.invalid) {
            this.toastr.error('Erro no formulário!');
            return;
        }
        const form = this.signUpForm.value;
        delete form.passwordConfirm;
        this.authService.register(this.signUpForm.value).subscribe(
            (response) => {
                this._router.navigateByUrl('/sign-in');
                this.signUpForm.enable();
                this.signUpNgForm.resetForm();
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
