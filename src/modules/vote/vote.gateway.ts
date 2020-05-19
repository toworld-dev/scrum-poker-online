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

import { Socket, Server } from 'socket.io';
import { JwtPayload } from '../auth/interfaces/token.interface';
import { VoteService } from './vote.service';

@WebSocketGateway({ namespace: 'vote' })
export class VoteGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    private readonly voteService: VoteService,
  ) {}

  @WebSocketServer() wss: Server;

  handleConnection(socket: Socket) {
    console.log('connected socket', socket.id);
    const tokenData = this.getTokenData(socket);

    socket.join(tokenData.roomId);
    console.log('join', tokenData.roomId);
  }

  handleDisconnect(socket: Socket) {
    console.log('disconnect socket', socket.id);
    const tokenData = this.getTokenData(socket);

    socket.leave(tokenData.roomId);
    console.log('leave', tokenData.roomId);
  }

  getTokenData(socket: Socket): JwtPayload {
    try {
      const token = this.authService.getTokenFromSocket(socket);
      return this.authService.decode(token);
    } catch (e) {
      throw new Error(e);
    }
  }

  @SubscribeMessage('showVotes')
  async showVotes(socket: Socket) {
    console.log('showVotes');
    const tokenData = this.getTokenData(socket);

    const rando1 = Math.floor(Math.random() * 6) + 1;

    this.wss.to(tokenData.roomId).emit('votes', {
      [rando1]: [
        {
          clientId: '123',
          username: 'henrique',
        },
        {
          clientId: '321',
          username: 'Marcos',
        },
      ],
      5: [
        {
          clientId: '456',
          username: 'Jhonatan',
        },
      ],
    });
  }

  @SubscribeMessage('createVote')
  async createVote(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    const tokenData = this.getTokenData(socket);

    await this.voteService.vote({
      vote: data.vote,
      name: data.username,
      topic: data.topic,
      clientId: data.clientId,
    });

    this.showVotes(socket);
  }
}
