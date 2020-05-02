import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ormconfig from './ormconfig';
import { AuthModule } from './modules/auth/auth.module';
import { RoomModule } from './modules/room/room.module';
import { TopicModule } from './modules/topic/topic.module';
import { VoteModule } from './modules/vote/vote.module';
import { MainModule } from './modules/main/main.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    MainModule,
    AuthModule,
    RoomModule,
    TopicModule,
    VoteModule,
  ],
})
export class AppModule {}
