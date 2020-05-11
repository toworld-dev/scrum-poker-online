import { Topic } from '../../topic.entity';
import { ApiProperty } from '@nestjs/swagger';

class GetAllTopicResponseDataDto extends Topic {}

export class GetAllTopicResponseDto {
  @ApiProperty({
    type: GetAllTopicResponseDataDto,
    isArray: true,
  })
  data: GetAllTopicResponseDataDto[];

  @ApiProperty({
    type: 'number',
  })
  count: number;
}
