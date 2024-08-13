import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { mat_outline } from '../../modais/criacao-grupo/edicao-criacao-grupo.component';
import { PageMasterService } from 'app/modules/services/page-master.service';

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

    // filteredObsv: Observable<any[]>;

    form = this.fb.group({
        icon: ['', Validators.required],
        search: ['', Validators.required],
    });
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder,
        private pageMasterService: PageMasterService,
        public dialogRef: MatDialogRef<ShowIconsComponent>
    ) {}
    ngOnInit(): void {
        this.filterByName('');
        this.form.get('search')?.valueChanges.subscribe((value) => {
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

    // async requisicoes() {
    //     this.filteredObsv = this.form.controls.search.valueChanges.pipe(
    //         startWith(''),
    //         map((value) => this.filter2(value || ''))
    //     );
    // }

    // filter2(value: string): any[] {
    //     console.log(this.matIcons);
    //     console.log(this.filteredObsv);
    //     return this.matIcons.filter((option) =>
    //         option.icon.toLowerCase().includes(value)
    //     );
    // }

    editIcon(icon: string): void {
        this.dialogRef.close(icon);

        // this.pageMasterService.updateGroup(this.data.group_id, {
        //     id: this.data.group_id,
        //     title: this.data.title,
        //     icon: this.form.value.icon,
        // });
    }

    cleanInput() {
        this.form.patchValue({
            search: '',
        });
        this.form.controls.search.markAsUntouched();
    }
}
