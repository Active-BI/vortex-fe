import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'app/modules/services/admin.service';
import { SocketService } from 'app/modules/services/socket.service';

@Component({
    selector: 'app-telas',
    templateUrl: './telas.component.html',
    styleUrls: ['./telas.component.scss'],
})
export class TelasComponent implements OnInit {
    @ViewChild('paginator') paginator: MatPaginator;
    selectedPage = '';
    myPageControl = new FormControl('');
    tenantId = '';

    displayedColumns: string[] = ['nome'];
    secondDisplayedColumns: string[] = ['nome', 'opt'];

    pages: MatTableDataSource<any>;
    secondPage: MatTableDataSource<any>;

    constructor(
        private socketService: SocketService,
        private adminSrv: AdminService,
        public dialog: MatDialog
    ) {
        this.tenantId = localStorage.getItem('tenant_id');
        this.requisicoes();
    }
    ngOnInit(): void {
        this.requisicoes();
    }
    secontTable(pageId) {
        this.secondPage.filter = pageId.trim().toLowerCase();
    }
    requisicoes() {
        this.adminSrv.getUserByPages().subscribe((e) => {
            this.selectedPage = e[0].Page.id;

            this.pages = new MatTableDataSource(e);
            this.secondPage = new MatTableDataSource(e[0].User_Page);

            this.pages.paginator = this.paginator;
            this.secondPage.paginator = this.paginator;

            this.pages.filterPredicate = (data: any, filter: string) => {
                return data.Page.title
                    .split(' ')
                    .join('')
                    .toLowerCase()
                    .includes(filter);
            };
            this.secondPage.filterPredicate = (data: any, filter: string) => {
              console.log(filter)
                return data.User.name
                    .split(' ')
                    .join('')
                    .toLowerCase()
                    .includes(filter);
            };
        });
    }
    filtrarSegundaTabela(id) {
        const users = this.pages.data.find((p) => p.page_id === id).User_Page;
        this.secondPage = new MatTableDataSource(users);
    }
    pagesFiltrados: MatTableDataSource<any>;
}
