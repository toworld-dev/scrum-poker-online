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
import { TopicService } from '../topic/topic.service';

@WebSocketGateway({ namespace: 'vote' })
export class VoteGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    private readonly voteService: VoteService,
    private readonly topicService: TopicService,
  ) {}

  @WebSocketServer() wss: Server;

  handleConnection(socket: Socket) {
    const tokenData = this.getTokenData(socket);
    console.log('connected socket', tokenData.clientId);

    socket.join(tokenData.roomId);
    console.log('join', tokenData.roomId);
  }

  handleDisconnect(socket: Socket) {
    const tokenData = this.getTokenData(socket);
    console.log('disconnect socket', tokenData.clientId);

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
    const votes = await this.topicService.votes(tokenData.roomId);

    this.wss.to(tokenData.roomId).emit('votes', votes);
  }

  @SubscribeMessage('createVote')
  async createVote(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    // const tokenData = this.getTokenData(socket);

    await this.voteService.vote({
      vote: data.vote,
      name: data.username,
      topic: data.topic,
      clientId: data.clientId,
    });

    this.showVotes(socket);
  }

  @SubscribeMessage('showResult')
  async showResult(socket: Socket) {
    console.log('showResult');
    const tokenData = this.getTokenData(socket);
    const topic = await this.topicService.latestTopic(tokenData.roomId);
    const mostVoted = await this.topicService.mostVotedOfTopic(topic.id);

    const result = [];
    let max = 0;

    mostVoted.forEach((cur: any) => {
      if (cur.total >= max) {
        max = cur.total;
        result.push(cur.vote);
      }
    });

    this.wss.to(tokenData.roomId).emit('result', result);
  }
}
