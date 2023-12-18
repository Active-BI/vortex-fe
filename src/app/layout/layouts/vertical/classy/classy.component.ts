import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
    FuseNavigationItem,
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import jwtDecode from 'jwt-decode';
import { MenuItemService } from 'app/mock-api/common/navigation/data';
import { text } from 'express';
function getContrastColor(hexColor) {
    // Extrai os componentes de cor (R, G, B)
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
  
    // Calcula a luminância usando a fórmula de correção gama
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
    // Retorna 'branco' se a luminância for menor ou igual a 0,5, caso contrário, retorna 'preto'
    return luminance <= 0.5 ? '#ffffff' : '#000000';
  }
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

    color= '#0f172a'
    text_color= 'print:hidden text-[#ffffff]'
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
        this.color = JSON.parse(localStorage.getItem('tenant_color')) || '#0f172a'
        const corContrastante = getContrastColor(this.color);
        this.text_color = 'print:hidden text-[' + corContrastante + ']'
        this.image = JSON.parse(localStorage.getItem('tenant_image'))
    }
    createNavigation(route) {
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                try {
                    const rotas = route;

                    // console.log(filterChildrens);
                    navigation.default = JSON.parse(localStorage.getItem('userRoutes')) as FuseNavigationItem[]
                    navigation.default = navigation.default.sort((a,b) => {
                        if (a.title === 'Administrador') {
                            return 1
                        }
                        return -1
                    }).sort((a,b) => {
                        if (a.title === 'Inicio') {
                            return -1
                        }
                        return  1
                    })
                    this.navigation = navigation

                } catch (e) {
                    // this._router.navigate(['/auth/login']);
                }
            });
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
        Promise.all([JSON.parse(localStorage.getItem('userRoutes'))]).then(async (e) => {
            if (e[0]) {
                this.createNavigation(e[0])
            }
                const rotasTratadas = await this.menuItemService.getNewRoutes()
                this.createNavigation(rotasTratadas)
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
