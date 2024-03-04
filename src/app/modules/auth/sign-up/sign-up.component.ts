import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    NgForm,
    Validators,
    AbstractControl,
    FormControl,
    FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { LocalAuthService } from 'app/modules/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SignUpModalComponent } from './sign-up-modal/sign-up-modal.component';
import jwtDecode from 'jwt-decode';
import { ThisReceiver } from '@angular/compiler';
import { AccessModelComponent } from '../access-model/access-model.component';
import { SocketService } from 'app/modules/services/socket.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignUpComponent
    extends AccessModelComponent
    implements OnInit
{
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
        private _ActRouter: ActivatedRoute,
        private _authService: LocalAuthService,
        authService: LocalAuthService,
        socketService: SocketService,

        private dialog: MatDialog
    ) {
        super(socketService, authService);
    }
    id = '';
    email = '';
    token = '';
    async ngOnInit() {
        try {
            this.token = this._ActRouter.snapshot.paramMap.get('token');
            await jwtDecode(this.token, {
                header: true,
            });

            const decoded: any = await jwtDecode(this.token);

            this.email = decoded.contact_email;
            this.signUpForm.patchValue({
                email: decoded.contact_email,
            });
        } catch (e) {
            localStorage.clear();
            this._router.navigate(['/auth/sign-in']);
        }
    }

    signUpForm = this._formBuilder.group(
        {
            email: [{ value: '', disabled: true }],
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
        },
        { validators: this.passwordMatchValidator }
    );
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
    passwordMatchValidator(group: FormGroup) {
        const password = group.get('password').value;
        const confirmPassword = group.get('passwordConfirm').value;
        return password === confirmPassword ? null : { mismatch: true };
    }

    signUp(): void {
        if (this.signUpForm.invalid) {
            this.toastr.error('Erro no formulário!');
            return;
        }

        const form = this.signUpForm.value;
        delete form.passwordConfirm;
        this._authService
            .register({
                ...this.signUpForm.value,
                email: this.email,
                token: this.token,
            })
            .subscribe((response) => {
                this.dialog.open(SignUpModalComponent, {
                    data: {
                        data: () => {
                            this.dialog.closeAll();
                            this._router.navigate(['/auth/sign-in'], {
                                queryParams: {
                                    email: this.signUpForm.value.email,
                                },
                            });
                            this.signUpForm.enable();
                            this.signUpNgForm.resetForm();
                        },
                    },
                });
            });
    }
}
