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
import { MenuItemService } from 'app/mock-api/common/navigation/data';
import { AppConfigs } from 'app/modules/services/appServices/appConfigs';
import { GlobalService } from 'app/modules/services/appServices/globalService';

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

    color = '#EEECE9';
    text_color = 'print:hidden text-[#ffffff]';
    image = '';
    constructor(
        public appConfigs: AppConfigs,
        private _router: Router,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private menuItemService: MenuItemService,
    private globalService: GlobalService
    ) {
        this.color = appConfigs.tenant_color;

        const corContrastante = this.getContrastColor(this.color);
        this.text_color = 'print:hidden text-[' + corContrastante + ']';
            this.image = appConfigs.tenant_image;
    }

    getContrastColor(hexColor) {
        // Extrai os componentes de cor (R, G, B)
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
    
        // Calcula a luminância usando a fórmula de correção gama
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
        // Retorna 'branco' se a luminância for menor ou igual a 0,5, caso contrário, retorna 'preto'
        return luminance <= 0.5 ? '#ffffff' : '#000000';
    }
    createNavigation(route) {
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                try {
                    navigation.default = route
                       
                    this.navigation = navigation;
                } catch (e) {}
            });
    }

    get currentYear(): number {
        return new Date().getFullYear();
    }

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
        this.globalService.userRoute$.subscribe((e) => {
            this.createNavigation(e);
        })
      
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

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
