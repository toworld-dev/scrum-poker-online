import { Vote } from '../../vote.entity';
import { ApiProperty } from '@nestjs/swagger';

class GetAllVoteResponseDataDto extends Vote {}

export class GetAllVoteResponseDto {
  @ApiProperty({
    type: GetAllVoteResponseDataDto,
    isArray: true,
  })
  data: GetAllVoteResponseDataDto[];
  @ApiProperty({
    type: 'number',
  })
  count: number;
}
