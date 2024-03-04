import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SessionService } from 'app/modules/services/session.service';
import { SocketService } from 'app/modules/services/socket.service';
import moment from 'moment';

@Component({
    selector: 'app-geral',
    templateUrl: './geral.component.html',
})
export class GeralComponent implements OnInit, OnDestroy {
    @ViewChild('paginator') paginator: MatPaginator;
    myControl = new FormControl('');
    pipe = new DatePipe('en-US');
    tenantId = '';
    displayedColumns: string[] = ['nome', 'email', 'total_acessos'];
    form = this.fb.group({
        data_inicio: [''],
        data_fim: [''],
    });
    usuarios: MatTableDataSource<any>;
    usuariosL: number = 0;
    usuariosData;
    constructor(
        private socketService: SocketService,
        private sessionSrv: SessionService,
        public dialog: MatDialog,
        private fb: FormBuilder
    ) {
        this.tenantId = localStorage.getItem('tenant_id');
        this.requisicoes();
    }
    async clearDate() {
        await this.form.patchValue({ data_inicio: '', data_fim: '' });
        this.filtarUsuarios();
    }
    conn;
    ngOnInit(): void {
        // this.conn = this.socketService.socket.on('refresh-conn', () => {
        //     this.requisicoes();
        // });
    }
    ngOnDestroy() {
        // this.conn.off()
    }
    requisicoes() {
        this.sessionSrv.getAllSessions(this.tenantId).subscribe((e) => {
            this.usuariosData = e;
            this.usuarios = new MatTableDataSource(e);
            this.usuariosFiltrados = new MatTableDataSource(e);
            this.usuariosFiltrados.paginator = this.paginator;
            this.usuarios.paginator = this.paginator;
            this.usuariosL = this.usuarios?.data.length;
        });
    }
    usuariosFiltrados: MatTableDataSource<any>;
    filtarUsuarios() {
        let data = this.usuariosData.filter((u) =>
            u.name.toUpperCase().includes(this.myControl.value.toUpperCase())
        );
        if (this.form.value.data_inicio !== '') {
            data = data.map((usrs) => {
                usrs = { ...usrs, log: [...usrs.log] }; // Cria uma cópia profunda do objeto 'usrs'

                usrs.log = usrs.log.filter((log) => {
                    const data_inicio_ISO = moment(
                        this.form.value.data_inicio,
                        'DD/MM/YYYY'
                    )
                        .startOf('day')
                        .toISOString();
                    const data_fim_ISO = moment(
                        this.form.value.data_fim || this.form.value.data_inicio,
                        'DD/MM/YYYY'
                    )
                        .endOf('day')
                        .toISOString();

                    console.log({ data_inicio_ISO, data_fim_ISO });
                    if (
                        moment(data_inicio_ISO).isSameOrBefore(
                            log.created_at
                        ) &&
                        moment(data_fim_ISO).isSameOrAfter(
                            log.exited_at || log.updated_at
                        )
                    ) {
                        return true;
                    }
                    return false;
                });

                return usrs;
            });
        }

        this.usuariosFiltrados = new MatTableDataSource(data);
        this.usuariosFiltrados.paginator = this.paginator;
    }
    closeConn(userEmail): void {
        this.socketService.socket.emit('disconnect-session', userEmail);
    }
}
