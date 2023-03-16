import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    NgForm,
    Validators,
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
    signUpForm: UntypedFormGroup;
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

    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    signUp(): void {
        if (this.signUpForm.invalid) {
            this.toastr.error('Erro no formulário!');
            return;
        }

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
