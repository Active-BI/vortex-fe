import { Component, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/modules/services/auth.service';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-send-pass-recover',
    templateUrl: './send-pass-recover.component.html',
    styleUrls: ['./send-pass-recover.component.scss'],
})
export class SendPassRecoverComponent implements OnInit {
    showAlert: boolean = false;
    email = new FormControl('', [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]);
    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private authService: AuthService
    ) {}
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
    redirect(): void {
        this.router.navigate(['/app/inicio']);
    }
    sendEmail(): void {
        if (this.email.invalid) {
            this.toastr.error('Erro no formulário!');
            return;
        }

        this.authService.resetPass(this.email.value).subscribe((e) => {
            this.router.navigate(['/auth/sign-in']);
        });
    }
}
