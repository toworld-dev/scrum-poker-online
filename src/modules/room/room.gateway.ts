import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { AuthService } from '../auth/auth.service';

import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: 'room' })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer() wss: Server;

  handleConnection(socket: Socket) {
    console.log('connected socket', socket.id);
  }

  handleDisconnect(socket: Socket) {
    console.log('disconnect socket', socket.id);
  }
}
