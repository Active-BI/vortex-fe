import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bi-default',
  templateUrl: './bi-default.component.html',
  styleUrls: ['./bi-default.component.scss']
})
export class BiDefaultComponent implements OnInit {
  reportId = ''
  groupId = '';
  constructor() {

   }

  ngOnInit(): void {
  }

}
