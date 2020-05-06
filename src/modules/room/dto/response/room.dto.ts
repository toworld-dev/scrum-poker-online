import { OmitType } from '@nestjs/swagger';
import { Room } from '../../room.entity';

export class RoomResponseDto extends OmitType(Room, ['password']) {}
