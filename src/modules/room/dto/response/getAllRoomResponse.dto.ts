import { OmitType, ApiProperty } from '@nestjs/swagger';
import { RoomResponseDto } from './roomResponse.dto';

class GetAllRoomResponseDataDto extends RoomResponseDto {}

export class GetAllRoomResponseDto {
  @ApiProperty({
    type: GetAllRoomResponseDataDto,
    isArray: true,
  })
  data: GetAllRoomResponseDataDto[];

  @ApiProperty({
    type: 'number',
  })
  count: number;
}
