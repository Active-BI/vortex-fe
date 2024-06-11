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
import { AccessModelComponent } from '../access-model/access-model.component';
import { SocketService } from 'app/modules/services/socket.service';

@Component({
    selector: 'app-reset-pass',
    templateUrl: './reset-pass.component.html',
    styleUrls: ['./reset-pass.component.scss'],
})
export class ResetPassComponent extends AccessModelComponent implements OnInit {
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
        private _authService: LocalAuthService,
        authService: LocalAuthService,
        socketService: SocketService
    ) {
        super(socketService, authService);
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
                    this.validadeLowerCaseLetter,
                    this.validateNumber,
                ],
            ],
        });
    }

    ngOnInit(): void {}

    valilateSpecialCharacterPassword(control: FormControl) {
        return /[^a-zA-Z0-9 ]/.test(control.value as string)
            ? true
            : { specialChar: true };
    }
    valilateUpperCaseLetter(control: FormControl) {
        return /[A-Z]/.test(control.value as string)
            ? true
            : { UpperCaseLetter: true };
    }
    validateNumber(control: FormControl) {
        return /\d/.test(control.value as string)
            ? true
            : { numberRequired: true };
    }
    validadeLowerCaseLetter(control: FormControl) {
        return /[a-z]/.test(control.value as string)
            ? true
            : { LowerCaseLetter: true };
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

        this._authService.setNewPass(form).subscribe(() => {
            this.signUpForm.enable();
            this.signUpNgForm.resetForm();
            this.toastr.success('Mudança de senha concluída');
            this._router.navigate(['/auth/sign-in']);
        });
    }
}
