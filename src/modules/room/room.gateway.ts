import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { AuthService } from '../auth/auth.service';

import { Socket, Server } from 'socket.io';

interface IOnlineUsers {
  [roomId: string]: string[];
}

@WebSocketGateway()
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer() wss: Server;
  online: IOnlineUsers = {};

  getToken(socket: Socket): string {
    try {
      return socket.handshake.query.token;
    } catch (e) {
      throw new Error(e);
    }
  }

  getRoom(socket: Socket): string {
    const token = this.getToken(socket);

    try {
      const payload = this.authService.decode(token);
      return payload.roomId;
    } catch (e) {
      throw new Error(e);
    }
  }

  handleConnection(socket: Socket) {
    console.log('connected socket', socket.id);
    const roomId = this.getRoom(socket);

    socket.join(roomId);
    console.log('join', roomId);

    if (!!this.online[roomId]) {
      this.online[roomId].push(socket.id);
    } else {
      this.online[roomId] = [socket.id];
    }
  }

  handleDisconnect(socket: Socket) {
    console.log('disconnect socket', socket.id);
    const roomId = this.getRoom(socket);

    socket.leave(roomId);
    console.log('leave', roomId);

    this.online[roomId].splice(this.online[roomId].indexOf(socket.id), 1);
    this.handleMessage(socket);

    if (this.online[roomId].length === 0) {
      delete this.online[roomId];
    }
  }

  @SubscribeMessage('showOnline')
  handleMessage(socket: Socket) {
    console.log('showOnline');
    const roomId = this.getRoom(socket);

    const token = socket.handshake.query.token;
    const payload = this.authService.decode(token);

    this.wss.to(roomId).emit('online', this.online[payload.roomId]);
  }
}
