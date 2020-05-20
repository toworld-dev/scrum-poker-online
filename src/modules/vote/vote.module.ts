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

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Topic]), AuthModule, TopicModule],
  providers: [VoteService, AuthService, VoteGateway],
  controllers: [VoteController],
})
export class VoteModule {}
