import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VoteController } from './vote.controller';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';
import { VoteGateway } from './vote.gateway';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { TopicModule } from '../topic/topic.module';
import { Topic } from '../topic/topic.entity';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { VoteException } from './vote.exception';

@Module({
  imports: [
    MappedExceptionModule.forFeature(VoteException),
    TypeOrmModule.forFeature([Vote, Topic]),
    AuthModule,
    TopicModule,
  ],
  providers: [VoteService, AuthService, VoteGateway],
  controllers: [VoteController],
})
export class VoteModule {}
