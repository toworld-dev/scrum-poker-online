import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { AuthService } from '../auth/auth.service';

import { Socket, Server } from 'socket.io';
import { JwtPayload } from '../auth/interfaces/token.interface';

interface IOnlineUser {
  clientId: string;
  username: string;
}

interface IOnlineUsers {
  [roomId: string]: IOnlineUser[];
}

@WebSocketGateway({ namespace: 'account' })
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

  getTokenData(socket: Socket): JwtPayload {
    const token = this.getToken(socket);

    try {
      return this.authService.decode(token);
    } catch (e) {
      throw new Error(e);
    }
  }

  handleConnection(socket: Socket) {
    console.log('connected socket', socket.id);
    const tokenData = this.getTokenData(socket);

    socket.join(tokenData.roomId);
    console.log('join', tokenData.roomId);

    if (!!this.online[tokenData.roomId]) {
      this.online[tokenData.roomId].push({
        clientId: socket.id,
        username: tokenData.username,
      });
    } else {
      this.online[tokenData.roomId] = [
        {
          clientId: socket.id,
          username: tokenData.username,
        },
      ];
    }
  }

  handleDisconnect(socket: Socket) {
    console.log('disconnect socket', socket.id);
    const tokenData = this.getTokenData(socket);

    socket.leave(tokenData.roomId);
    console.log('leave', tokenData.roomId);

    this.online[tokenData.roomId] = this.online[tokenData.roomId].filter(
      user => user.clientId !== socket.id,
    );
    this.handleMessage(socket);

    if (this.online[tokenData.roomId].length === 0) {
      delete this.online[tokenData.roomId];
    }
  }

  @SubscribeMessage('showOnline')
  handleMessage(socket: Socket) {
    console.log('showOnline');
    const tokenData = this.getTokenData(socket);

    this.wss.to(tokenData.roomId).emit('online', this.online[tokenData.roomId]);
  }
}
