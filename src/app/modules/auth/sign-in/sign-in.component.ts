import {
    AfterViewInit,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

import { UserService } from 'app/modules/services/login/login';
import { PageService } from 'app/modules/services/page.service';
import { SocketService } from 'app/modules/services/socket.service';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { LocalAuthService } from 'app/modules/services/auth.service';
import { AuthService } from 'app/modules/services/auth/auth.service';
import { AppConfig } from 'app/core/config/app.config';
import { AppConfigs } from 'app/modules/services/appConfigs';

interface User {
    email: string;
    password: string;
}

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent
    implements OnInit, AfterViewInit
{
    error: string = '';
    showAlert = false;
    showSpinner = false;

    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.minLength(6)]);

    constructor(
        private router: Router,
        private userService: UserService,
        private _authService: AuthService,
        private localAuthService: LocalAuthService,
        public appConfigs: AppConfigs,
        _socketService: SocketService,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ) {

    }

    ngAfterViewInit(): void {
        if (this._authService.isLoggedIn()) {
            this.router.navigateByUrl('app/inicio');
        }
    }
    ngOnInit(): void {
        this.localAuthService.getAppVisualConfigs().subscribe((res: {bg_color: string, app_image: string,tenant_image: string }) => {
            localStorage.setItem('bg_color', res.bg_color);
            localStorage.setItem('app_image', res.app_image);
            localStorage.setItem('logo', res.tenant_image);
        })

        this.route.queryParams.subscribe((params) => {
            if (params.email) {
                this.email.setValue(params.email);
            }
        });
    }

    redirect(): void {
        this.router.navigate(['/app/inicio']);
    }

    register(): void {
        this.router.navigateByUrl('/register');
    }

    login(): any {
        const data: User = {
            email: this.email.value as string,
            password: this.password.value as string,
        };
        if (this.email.invalid || this.password.invalid) {
            this.toastr.error('Campos inválidos');
            return;
        }

        this.userService.Login(data).subscribe(
            (loginResponse) => {
                if (this.checkIfUserCanPassThrough(loginResponse)) {
                    this.sendUserToTheApp(loginResponse.token);
                    return;
                }
                this.sendUserToThe2FA(loginResponse.token);
            },
            (err) => {
                this.error = err.error.message;
            }
        );
    }

    checkIfUserCanPassThrough(loginResponse): boolean {
        /*
            If the user is Master, then  the "pass through" key will be true
        */
        if (loginResponse.passThrough === true) {
            return true;
        }

        // TODO - implements the logic to check if the user has been verified by TFA for at least 8h ago
        return false;
    }

    sendUserToTheApp(token): void {
        Promise.all([
            localStorage.setItem('token', JSON.stringify(token)),
        ]).then(() => {
            localStorage.removeItem('tempToken');
            setTimeout(() => {
                this.redirect();
            }, 500);
        });
    }

    sendUserToThe2FA(token): void {
        Promise.all([localStorage.setItem('tempToken', token)]).then(
            () => {
                this.redirectTfa();
            }
        );
    }

    redirectTfa(): void {
        this.router.navigate(['/auth/tfa']);
    }
}
