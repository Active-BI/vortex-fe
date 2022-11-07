import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmbeddedService {

  constructor(private http: HttpClient) { }

  baseUrl = `${environment.baseUrl}`;

  dicReportEmbedded = new Map<string, any>();

/**
 *
 * @param groupId é o Id do Workspace do relatório
 * @param reportId é o ID do relatóro
 * @returns Json com o token para relatório
 */
  getEmbeddedInfo(groupId: string, reportId: string, userId = ''): Observable<any>{
   return this.http.get(`${this.baseUrl}EmbedInfo/report?groupId=${groupId}&reportId=${reportId}`)
  }

  exportReportToPDF(groupId: string, reportId: string, userId = ''): Observable<any>{
    return this.http.get(`${this.baseUrl}ExportReport?groupId=${groupId}&reportId=${reportId}`)

  }
}
