import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicController } from './topic.controller';
import { Topic } from './topic.entity';
import { TopicService } from './topic.service';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { TopicException } from './topic.exception';

@Module({
  imports: [
    MappedExceptionModule.forFeature(TopicException),
    TypeOrmModule.forFeature([Topic]),
  ],
  providers: [TopicService],
  controllers: [TopicController],
  exports: [TopicService],
})
export class TopicModule {}
