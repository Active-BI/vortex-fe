import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Route, Router, RouterStateSnapshot } from '@angular/router';

import { EmbeddedService } from 'app/modules/services/embedded/embedded.service';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-gestao-vulnerabilidade',
  templateUrl: './gestao-vulnerabilidade.component.html',
  styleUrls: ['./gestao-vulnerabilidade.component.scss']
})
export class GestaoVulnerabilidadeComponent implements OnInit {
    reportID = '';
    groupID = '';
    enable = false
    layout = 'desktop';
    parametro$ = Observable<Data>;
    constructor(private router: ActivatedRoute
      ) {
        
      }
      
    ngOnInit(): void {
        this.router.params.subscribe((e) => {
          // console.log(e)
          this.enable = false
          this.reportID = e.reportId;
          this.groupID = e.groupId
          setTimeout(() => {this.enable = true}, 300);
          
    })
  }

}
