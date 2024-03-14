import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { TreinamentoService } from '../../services/treinamentos.service';

@Component({
  selector: 'app-treinamento',
  templateUrl: './treinamento.component.html',
  styleUrls: ['./treinamento.component.scss']
})
export class TreinamentoComponent implements OnInit {
  private playlistId = 'RDMM';
  videosPerPage = 15;
  currentPage = 17;
  videos = []

  constructor(private treinamentoService: TreinamentoService,
    public sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
  const localTreinamentos = localStorage.getItem("videos-treinamento")

  if (!localTreinamentos) {
    this.treinamentoService.getTreinamentos(this.playlistId).subscribe((res: any) => {
      this.videos = res.map(item => {
        return ({
          ...item,
          safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + item.snippet.resourceId.videoId)
        })
      })
      localStorage.setItem("videos-treinamento",JSON.stringify(res))
    })
    }else {
      this.videos = JSON.parse(localStorage.getItem("videos-treinamento")).map(item => {
        return ({
          ...item,
          safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + item.snippet.resourceId.videoId)
        })
      })
    }
  } 
  get paginatedVideos() {
    const startIndex = (this.currentPage - 1) * this.videosPerPage;
    const endIndex = startIndex + this.videosPerPage;
    return this.videos.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }
  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
}
  get totalPages() {
    return Math.ceil(this.videos.length / this.videosPerPage);
  }
}