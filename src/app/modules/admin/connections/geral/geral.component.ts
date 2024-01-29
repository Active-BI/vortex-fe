import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'app/modules/services/admin.service';
import { SocketService } from 'app/modules/services/socket.service';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
})
export class GeralComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator: MatPaginator;
  myControl = new FormControl('');
  pipe = new DatePipe('en-US');
  tenantId = '';
  displayedColumns: string[] = [
      'nome', 
      'email',
      'total_acessos',
  ];
  usuarios: MatTableDataSource<any>;
  usuariosL: number = 0;
  constructor(
      private socketService: SocketService,
      private adminSrv: AdminService,
      public dialog: MatDialog
  ) {
      this.tenantId = localStorage.getItem('tenant_id');
      this.requisicoes();

  }

//   ngOnInit(): void {
//       this.requisicoes();
//       this.socketService.socket.on('refresh-conn', () => {
//         this.requisicoes();
//     });
//     this.socketService.socket.on('refresh-conn', ()).close();
//   }
    conn
  ngOnInit(): void {
        this.conn = this.socketService.socket.on('refresh-conn', () => {
            this.requisicoes();
        });
    }
    ngOnDestroy() {
        this.conn.off()
    }
  requisicoes() {
      this.adminSrv.getSessions(this.tenantId).subscribe((e) => {
          this.usuarios = new MatTableDataSource(e);
          this.usuariosFiltrados = new MatTableDataSource(e);
          this.usuariosFiltrados.paginator = this.paginator;
          this.usuarios.paginator = this.paginator;
          this.usuariosL = this.usuarios?.data.length;
      });
  }
  usuariosFiltrados: MatTableDataSource<any>;
  filtarUsuarios(e) {
      const data = this.usuarios.data.filter((u) =>
          u.name.toUpperCase().includes(e.toUpperCase())
      );
      this.usuariosFiltrados = new MatTableDataSource(data);
      this.usuariosFiltrados.paginator = this.paginator;
  }
  closeConn(userEmail): void {
      this.socketService.socket.emit('disconnect-session', userEmail);
  }
}
