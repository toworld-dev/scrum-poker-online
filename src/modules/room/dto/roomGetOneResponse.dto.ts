import { OmitType } from '@nestjs/swagger';
import { Room } from '../room.entity';

export class RoomGetOneResponseDto extends OmitType(Room, ['password']) {}
{
}
