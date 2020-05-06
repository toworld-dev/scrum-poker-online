import { OmitType } from '@nestjs/swagger';
import { Room } from '../../room.entity';

export class RoomCreateRequestDto extends OmitType(Room, ['id']) {}
