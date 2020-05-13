import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomController } from './room.controller';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { AuthModule } from '../auth/auth.module';
import { RoomGateway } from './room.gateway';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), AuthModule],
  providers: [RoomService, AuthService, RoomGateway],
  controllers: [RoomController],
})
export class RoomModule {}
