import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import jwtDecode from 'jwt-decode';
import { MenuItemService } from 'app/mock-api/common/navigation/data';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    user: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */

    color= ''
    image= ''
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private menuItemService: MenuItemService
    ) {
        this.color = JSON.parse(localStorage.getItem('tenant_color'))
        this.image = JSON.parse(localStorage.getItem('tenant_image'))
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
            });
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
        // Subscribe to navigation data
        Promise.all([this.menuItemService.getNewRoutes()]).then((e) => {
            if (e[0]) {
                this._navigationService.navigation$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((navigation: Navigation) => {
                        try {
                            const role = jwtDecode(
                                JSON.parse(localStorage.getItem('token'))
                            )['role_name'];

                            const rotas = e[0];
                            const filteredRoutes = rotas.filter((route) => {
                                if (!route.data.roles.includes(role))
                                    return false;
                                return true;
                            });
                            const filterChildrens = filteredRoutes.filter(
                                (route) => {
                                    if (route.children) {
                                        route.children = route.children.filter(
                                            (child) =>
                                                child.data.roles.includes(role)
                                        );
                                    }
                                    return route;
                                }
                            );
                            // console.log(filterChildrens);
                            navigation.default = filterChildrens;
                            // navigation.default = filteredRoutes;
                            this.navigation = navigation;
                        } catch (e) {
                            this._router.navigate(['/auth/login']);
                        }
                    });

                // Subscribe to the user service

                // Subscribe to media changes
            }
        });
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
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
