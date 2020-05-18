import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomController } from './room.controller';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { AuthModule } from '../auth/auth.module';
import { RoomGateway } from './room.gateway';
import { AuthService } from '../auth/auth.service';
import { TopicService } from '../topic/topic.service';
import { Topic } from '../topic/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Topic]), AuthModule],
  providers: [RoomService, AuthService, TopicService, RoomGateway],
  controllers: [RoomController],
})
export class RoomModule {}
