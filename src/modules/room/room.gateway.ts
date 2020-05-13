import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { AuthService } from '../auth/auth.service';

import { Socket } from 'socket.io';

interface IInput {
  token: string;
  data: {
    [name: string]: string;
  };
}

@WebSocketGateway()
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer() server: any;
  onlines: any = [];

  handleConnection(client: any) {
    console.log('connected');

    const token = client.handshake.query.token;
    const payload = this.authService.decode(token);
    console.log(payload);

    client.broadcast.emit('room.online', this.onlines);
  }

  handleDisconnect(client: Socket) {
    console.log('disconnected', client.id);
    delete this.onlines[client.id];

    client.broadcast.emit('room.online', this.onlines);
  }

  @SubscribeMessage('room.accounts')
  accountsEvent(
    @MessageBody() input: IInput,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('online', input);

    this.onlines[client.id] = input.data.user;
    client.broadcast.emit('room.online', this.onlines);
  }

  // @SubscribeMessage('room.topic')
  // topicEvent(@MessageBody() data: any) {
  //   console.log('room.topic', data);
  //   return data;
  // }

  // @SubscribeMessage('room.vote')
  // voteEvent(@MessageBody() data: any) {
  //   console.log('room.vote', data);
  //   return data;
  // }
}
