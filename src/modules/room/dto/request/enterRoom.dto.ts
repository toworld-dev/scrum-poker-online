import { PickType } from '@nestjs/swagger';
import { Room } from '../../room.entity';

export class EnterRoomDto extends PickType(Room, ['password']) {}
