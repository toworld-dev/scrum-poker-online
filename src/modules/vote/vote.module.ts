import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VoteController } from './vote.controller';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';
import { VoteGateway } from './vote.gateway';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), AuthModule],
  providers: [VoteService, AuthService, VoteGateway],
  controllers: [VoteController],
})
export class VoteModule {}
