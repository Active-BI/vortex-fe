import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-access-request',
    templateUrl: './access-request.component.html',
    styleUrls: ['./access-request.component.scss'],
})
export class AccessRequestComponent implements OnInit {
    accountForm = this._formBuilder.group({
        email: ['', Validators.required],
        name: ['', Validators.required],
        description: [''],
        profession: ['', Validators.required],
        company_name: ['', Validators.required],
        company_cnpj: ['', Validators.required],
        company_description: ['', Validators.required],
    });
    checkScreenSize() {
        return window.innerWidth > 768;
    }
    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
    }
}
