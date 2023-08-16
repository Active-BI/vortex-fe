import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import jwtDecode from 'jwt-decode';
import { RequestConfirmModalComponent } from './request-access/request-modal.component';
import { AdminRequestService } from 'app/modules/services/admin-request.service';

@Component({
    selector: 'auth-request-access',
    templateUrl: './request-access.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthRequestAccessComponent implements OnInit {
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
        private _router: Router,
        private _ActRouter: ActivatedRoute,
        private adminRequestService: AdminRequestService,
        private dialog: MatDialog
    ) {}
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

            this.email = decoded.email;
            console.log(decoded);
        } catch (e) {
            localStorage.clear();
            this._router.navigate(['/auth/sign-in']);
        }

        this.adminRequestService
            .getConfirmationAdminRequests(this.token)
            .subscribe(
                (res) => {
                    console.log(res);
                    this.submit();
                },
                ({ error }) => {
                    this._router.navigate(['/home']);
                }
            );
    }
    submit() {
        this.dialog.open(RequestConfirmModalComponent, {
            data: {
                dados: this.email,
                data: () => {
                    this.dialog.closeAll();
                    this._router.navigate(['/home']);
                },
            },
        });
    }
}
