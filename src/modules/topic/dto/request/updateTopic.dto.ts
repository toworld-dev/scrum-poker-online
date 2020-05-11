import { PartialType } from '@nestjs/swagger';
import { CreateTopicDto } from './createTopic.dto';

export class TopicUpdateDto extends PartialType(CreateTopicDto) {}
