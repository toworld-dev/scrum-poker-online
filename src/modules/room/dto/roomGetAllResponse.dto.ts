import { OmitType } from '@nestjs/swagger';
import { Room } from '../room.entity';

class RoomGetAllResponseDataDto extends OmitType(Room, ['password']) {}

export class RoomGetAllResponseDto {
  data: RoomGetAllResponseDataDto[];
  count: number;
}
