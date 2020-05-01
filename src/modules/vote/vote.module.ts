import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteController } from './vote.controller';
import { Vote } from './vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
  controllers: [VoteController],
})
export class VoteModule {}
