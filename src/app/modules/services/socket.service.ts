import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import { environment } from 'environments/environment';
import { LocalAuthService } from './auth.service';
import { AuthService } from './auth/auth.service';
import { AppConfigs } from './appServices/appConfigs';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    socket: Socket;
    constructor(private authService: AuthService, private appConfigs: AppConfigs) {
        this.socket = io(environment.socketUrl);
    }

    Logeddin(sessionId, userToken) {
        const user: any = jwtDecode(userToken);
        const message = {
            sessionId,
            userName: user.name,
            userEmail: sessionId,
            tenant_id: user.tenant_id,
        };
        this.socket.connect();
        this.socket.emit('login', JSON.stringify(message));
    }

    disconnectSecction(sessionId) {
        this.socket.emit('disconnect-session', sessionId);
        this.socket.disconnect();
    }

    userCheck() {
        const sessionId: any = localStorage.getItem('session_id');
        const token: any = localStorage.getItem('token');
        if (!token || !sessionId) {
            this.authService.logout();
            this.appConfigs.removeTenantConfigs()
            return;
        }
        const user: any = jwtDecode(localStorage.getItem('token'));
        const message = {
            sessionId,
            userName: user.name,
            userEmail: user.email,
        };
        this.socket.emit('user-check', message);
    }
    alive() {
        const sessionId: any = localStorage.getItem('session_id');

        this.socket.emit(
            'alive',
            JSON.stringify({
                sessionId,
                userAgent: navigator.userAgent,
                platform: navigator.platform,
            })
        );
    }
    getSocket() {
        const sessionId = JSON.parse(localStorage.getItem('session_id'));
        this.socket.emit('get-socket', sessionId);
    }
}
