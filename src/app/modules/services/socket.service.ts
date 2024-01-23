import {  Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    socket: Socket;
    constructor(private authService: AuthService) {
        this.socket = io(environment.socketUrl);
    }

    Logeddin(sessionId, userToken) {
        const user: any = jwtDecode(userToken);
        const message = {
            sessionId,
            userName: user.name,
            userEmail: user.email,
        };
        this.socket.connect();
        this.socket.emit('login', JSON.stringify(message));
    }

    disconnectSecction(sessionId) {
        this.socket.emit('disconnect-session', sessionId);
        this.socket.disconnect();
    }

    userCheck() {
        const sessionId: any = localStorage.getItem('sessionId');
        const token: any = localStorage.getItem('token');
        if (!token || !sessionId) {
            this.authService.logout();
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
    getSocket() {
        const sessionId = JSON.parse(localStorage.getItem('sessionId'));
        this.socket.emit('get-socket', sessionId);
    }
}
