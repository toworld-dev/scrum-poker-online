import { PartialType } from '@nestjs/swagger';
import { TopicCreateDto } from './topicCreate.dto';

export class TopicUpdateDto extends PartialType(TopicCreateDto) {}
