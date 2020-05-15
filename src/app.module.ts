import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ormconfig from './ormconfig';
import { AuthModule } from './modules/auth/auth.module';
import { RoomModule } from './modules/room/room.module';
import { TopicModule } from './modules/topic/topic.module';
import { VoteModule } from './modules/vote/vote.module';
import { AppController } from './app.controller';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    RoomModule,
    TopicModule,
    VoteModule,
    AccountModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
