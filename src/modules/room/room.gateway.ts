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
import { AuthType } from '../auth/interfaces/types.interface';
import { TopicService } from '../topic/topic.service';
import { RoomService } from './room.service';
import { Room } from './room.entity';

@WebSocketGateway({ namespace: 'room' })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    private readonly topicService: TopicService,
    private readonly roomService: RoomService,
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

  @SubscribeMessage('showTopic')
  async showTopic(socket: Socket) {
    console.log('showTopic');
    const tokenData = this.getTokenData(socket);

    const room = await this.roomService.getOne(tokenData.roomId);
    delete room.password;

    const topics = await room.topics;

    this.wss.to(tokenData.roomId).emit('room', {
      ...room,
      topic: {
        description: topics.length ? topics[topics.length - 1].description : '',
      },
    });
  }

  @SubscribeMessage('createTopic')
  async createTopic(
    @ConnectedSocket() socket: Socket,
    @MessageBody() topicName: string,
  ) {
    const tokenData = this.getTokenData(socket);

    if (tokenData.type === AuthType.ADMIN) {
      await this.topicService.create({
        description: topicName,
        room: tokenData.roomId,
      });

      this.showTopic(socket);
    } else {
      throw new Error('Sem permissao para criar topico');
    }
  }
}
