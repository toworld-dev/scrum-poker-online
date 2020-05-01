import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';

@Module({
  controllers: [RoomController],
})
export class RoomModule {}
