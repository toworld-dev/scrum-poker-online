import { OmitType } from '@nestjs/swagger';
import { Room } from '../room.entity';

export class RoomCreateResponseDto extends OmitType(Room, ['password']) {}
