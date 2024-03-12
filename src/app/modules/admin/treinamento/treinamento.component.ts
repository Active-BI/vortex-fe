import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-treinamento',
  templateUrl: './treinamento.component.html',
  styleUrls: ['./treinamento.component.scss']
})
export class TreinamentoComponent implements OnInit {
  private apiKey = 'AIzaSyDQ7M9VBoOw6R3XZiYQqiDNg_phHVuvQiw';
  private playlistId = 'RDMM';
  private apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${this.apiKey}&playlistId=${this.playlistId}&part=snippet&maxResults=50`;
  videos = []
  constructor(private http: HttpClient,
    public sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    var header = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'AIzaSyDQ7M9VBoOw6R3XZiYQqiDNg_phHVuvQiw'
   });
  this.http.get(this.apiUrl).subscribe((res: any) => {
    this.videos = res.items.map(item => {
      const date = moment('2015-02-20T16:16:38Z');
      const now = moment();

      const yearsAgo = now.diff(date, 'years');
      const monthsAgo = now.diff(date, 'months');
      const daysAgo = now.diff(date, 'days');

      let summary: string;

      if (yearsAgo >= 1) {
        summary = `há ${yearsAgo} ano${yearsAgo > 1 ? 's' : ''} atrás`;
      } else if (monthsAgo >= 1) {
        summary = `há ${monthsAgo} mês${monthsAgo > 1 ? 'es' : ''} atrás`;
      } else {
        summary = `há ${daysAgo} dia${daysAgo > 1 ? 's' : ''} atrás`;
      }

      return ({
      ...item,
      date: summary,
      safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + item.snippet.resourceId.videoId)
    })
    
  })
    
  })
  }

}
