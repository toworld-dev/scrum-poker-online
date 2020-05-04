import { Topic } from '../topic.entity';

class TopicGetAllResponseDataDto extends Topic {}

export class TopicGetAllResponseDto {
  data: TopicGetAllResponseDataDto[];
  count: number;
}
