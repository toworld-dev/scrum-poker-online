import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';

@WebSocketGateway()
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  handleConnection(client: any, ...args: any[]) {
    console.log('connected');
  }
  handleDisconnect(client: any) {
    console.log('disconnected');
  }

  @SubscribeMessage('room')
  roomEvent(@MessageBody() data: any) {
    console.log(data);
    return data;
  }
}
