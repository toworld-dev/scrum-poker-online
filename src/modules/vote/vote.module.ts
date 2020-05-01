import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';

@Module({
  controllers: [VoteController],
})
export class VoteModule {}
