import { Injectable } from '@angular/core';
import { PageService } from './page.service';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable()
export class DataStorage {
    pagesData: any = null;
    constructor(private pageSrv: PageService) {}

    storagePages(): Observable<any> {
        if (this.pagesData) return of(this.pagesData);

        return this.pageSrv.getDashboards().pipe(
            map((e: any) =>
                e
                    .map((report: any) => ({
                        ...report.Page,
                        datasetInf: report.datasetInf,
                    }))
                    .filter((r: any) => r.page_type === 'report'),
            ),
            tap((data) => (this.pagesData = data)),
            catchError((error) => {
                console.error('Erro ao buscar dashboards:', error);
                return of([]);
            }),
        );
    }
}
