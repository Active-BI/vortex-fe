import {
    AfterViewInit,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/modules/services/auth/auth.service';
import { UserService } from 'app/modules/services/login/login';
import { ToastrService } from 'ngx-toastr';

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
export class AuthSignInComponent implements OnInit, AfterViewInit {
    error: string = '';
    showAlert = false;
    showSpinner = false;

    email = new FormControl('', [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]);
    password = new FormControl('', [Validators.minLength(6)]);

    constructor(
        private router: Router,
        private userService: UserService,
        private authService: AuthService,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ) {}
    ngAfterViewInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigateByUrl('app/inicio');
        }
    }
    ngOnInit(): void {
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
            (res) => {
                Promise.all([
                    localStorage.setItem('token', JSON.stringify(res.token)),
                ]).then(() => {
                    this.redirect();
                });
            },
            (err) => {
                this.error = err.error.message;
            }
        );
    }
}
