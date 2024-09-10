import { Injectable } from '@angular/core';
import { PageService } from './page.service';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { GroupMasterService, trataRotas } from './group-master.service';

@Injectable()
export class DataStorageService {
    pagesData: any = null;
    masterGroupData: any = null;
    constructor(
        private pageSrv: PageService,
        private groupMasterSrv: GroupMasterService,
    ) {}

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

    storageMasterGroup(id: string): Observable<any> {
        return this.groupMasterSrv.newGetGroup(id).pipe(
            map((group) => {
                if (group.Page.length < 1) {
                    return {
                        page_group: group.title,
                        icon: group.icon,
                    };
                }

                return trataRotas(group.Page).find((g) => g.id === group.id);
            }),
            tap((data) => (this.masterGroupData = data)),
            catchError((error) => {
                console.error('Erro ao buscar dashboards:', error);
                return of([]);
            }),
        );
    }
}
