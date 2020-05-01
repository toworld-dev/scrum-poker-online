import { OmitType } from '@nestjs/swagger';
import { Room } from '../room.entity';

export class RoomUpdateResponseDto extends OmitType(Room, ['password']) {}
