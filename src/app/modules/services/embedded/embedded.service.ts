import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EmbeddedService {
    baseUrl = `${environment.baseUrl}`;

    handSetStatus = 'desktop';

    dicReportEmbedded = new Map<string, any>();

    handSetEmitter = new EventEmitter<string>();
    constructor(private http: HttpClient) {}

    changeHandSetStatus(layout: 'desktop' | 'mobile'): void {
        this.handSetStatus = layout;
        this.handSetEmitter.emit(this.handSetStatus);
    }

    /**
     *
     * @param groupId é o Id do Workspace do relatório
     * @param reportId é o ID do relatóro
     * @returns Json com o token para relatório
     */
    getEmbeddedReportInfo(groupId: string, reportId: string): Observable<any> {
        return this.http.get(
            `${this.baseUrl}power-bi/report/${groupId}/${reportId}`
        );
    }
    getEmbeddedDashboardInfo(
        groupId: string,
        reportId: string
    ): Observable<any> {
        return this.http.get(
            `${this.baseUrl}power-bi/dashboard/${groupId}/${reportId}`
        );
    }
    exportReportToPDF(
        groupId: string,
        reportId: string,
        userId = ''
    ): Observable<any> {
        return this.http.get(
            `${this.baseUrl}ExportReport?groupId=${groupId}&reportId=${reportId}`
        );
    }
}
