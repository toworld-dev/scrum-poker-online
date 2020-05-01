import { OmitType } from '@nestjs/swagger';
import { Room } from '../room.entity';

export class RoomCreateDto extends OmitType(Room, ['id']) {}
