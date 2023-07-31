import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
    faqCategory: any;
    private _unsubscribeAll: Subject<any> = new Subject();
    @ViewChild('elementoParaScrollar', { static: true })
    elementoParaScrollar: ElementRef;
    scrollToElement() {
        this.elementoParaScrollar.nativeElement.scrollIntoView();
    }
    constructor() {}
    redirecionar() {
        window.location.href = 'https://www.activebi.com.br/';
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the FAQs
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
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
