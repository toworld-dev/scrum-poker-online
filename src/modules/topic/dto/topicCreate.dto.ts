import { OmitType } from '@nestjs/swagger';
import { Topic } from '../topic.entity';

export class TopicCreateDto extends OmitType(Topic, ['id']) {}
