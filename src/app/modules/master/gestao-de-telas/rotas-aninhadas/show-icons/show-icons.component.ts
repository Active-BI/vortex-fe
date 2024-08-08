import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mat_outline } from '../../modais/criacao-grupo/edicao-criacao-grupo.component';
import { map, Observable, startWith } from 'rxjs';

type Icon = {
    type: string;
    icon: string;
};

@Component({
    selector: 'app-show-icons',
    templateUrl: './show-icons.component.html',
    styleUrls: ['./show-icons.component.scss'],
})
export class ShowIconsComponent implements OnInit {
    matIcons = mat_outline;
    showAll = false;
    filteredIcons: Icon[] = this.filterByName('');

    filteredObsv: Observable<any[]>;

    form = this.fb.group({
        id: [''],
        icon: ['', Validators.required],
        search: ['', Validators.required],
    });
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) {}
    ngOnInit(): void {
        this.filterByName('');
        this.form.get('search')?.valueChanges.subscribe((value) => {
            console.log(value);
            this.filteredIcons = this.filterByName(value);
        });
        // this.requisicoes();
    }

    selectIcon(icon) {
        this.form.patchValue({
            icon: icon.type + ':' + icon.icon,
            search: icon.icon,
        });
    }

    filterByName(name: string): Icon[] {
        // if (!name) return this.matIcons;

        return this.matIcons
            .filter(
                (icon) =>
                    icon.type.toLowerCase().includes(name.toLowerCase()) ||
                    icon.icon.toLowerCase().includes(name.toLowerCase())
            )
            .slice(0, 100);
    }

    async requisicoes() {
        this.filteredObsv = this.form.controls.search.valueChanges.pipe(
            startWith(''),
            map((value) => this.filter2(value || ''))
        );
    }

    filter2(value: string): any[] {
        console.log(this.matIcons);
        console.log(this.filteredObsv);
        return this.matIcons.filter((option) =>
            option.icon.toLowerCase().includes(value)
        );
    }
}
