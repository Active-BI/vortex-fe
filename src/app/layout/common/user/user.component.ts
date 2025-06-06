import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { AuthService } from 'app/modules/services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user',
})
export class UserComponent implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: User;

    private jwtItils = new JwtHelperService();

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _authService: AuthService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to user changes
        // this._authService.user$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((user) => {
        //         this.user = user;
        //         console.log(user)

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });
        const token = localStorage.getItem('token');
        const decodedToken: any = this.jwtItils.decodeToken(token);
        this.user = {
            id: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
            name: decodedToken.name,
            email: decodedToken.contact_email,
            avatar: 'assets/images/avatars/brian-hughes.jpg',
            status: 'online',
        };

        this._authService.user = this.user;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void {
        // Return if user is not available
    }

    /**
     * Sign out
     */
    signOut(): void {
        this._router.navigate(['auth/sign-out']);
    }
}
