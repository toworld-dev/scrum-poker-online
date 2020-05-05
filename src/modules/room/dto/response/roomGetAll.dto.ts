import { OmitType, ApiProperty } from '@nestjs/swagger';
import { RoomResponseDto } from './room.dto';

class RoomGetAllResponseDataDto extends RoomResponseDto {}

export class RoomGetAllResponseDto {
  @ApiProperty({
    type: RoomGetAllResponseDataDto,
    isArray: true,
  })
  data: RoomGetAllResponseDataDto[];

  @ApiProperty({
    type: 'number',
  })
  count: number;
}
