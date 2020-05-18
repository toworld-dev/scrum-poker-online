import { OmitType } from '@nestjs/swagger';
import { Topic } from '../../topic.entity';

export class CreateTopicDto extends OmitType(Topic, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
