import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-web-page',
  templateUrl: './web-page.component.html',
  styleUrls: ['./web-page.component.scss']
})
export class WebPageComponent implements OnInit {
  link
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    route.params.subscribe(params => {
      // console.log(this.sanitizer.bypassSecurityTrustResourceUrl(decodeURIComponent(params['web-page'])))
      this.link = decodeURIComponent(params['web-page'])
    } )
   }

  ngOnInit(): void {
  }

}
