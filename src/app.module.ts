import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormconfig from './ormconfig';
import { AuthModule } from './modules/auth/auth.module';
import { RoomModule } from './modules/room/room.module';
import { TopicModule } from './modules/topic/topic.module';
import { VoteModule } from './modules/vote/vote.module';
import { MainModule } from './modules/main/main.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    MainModule,
    AuthModule,
    RoomModule,
    TopicModule,
    VoteModule,
  ],
})
export class AppModule {}
