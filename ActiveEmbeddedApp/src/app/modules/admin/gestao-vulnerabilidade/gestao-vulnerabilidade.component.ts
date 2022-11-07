import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestao-vulnerabilidade',
  templateUrl: './gestao-vulnerabilidade.component.html',
  styleUrls: ['./gestao-vulnerabilidade.component.scss']
})
export class GestaoVulnerabilidadeComponent implements OnInit {
    reportID = '7b71c89f-1d23-4d57-a99c-369f0ae8b5d1';
    groupID = 'c807ca26-3f93-463d-aa15-9a12e48174ba';

    constructor() { }

  ngOnInit(): void {
  }

}
