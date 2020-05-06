import { PickType } from '@nestjs/swagger';
import { Room } from '../../room.entity';

export class RoomEnterRequestDto extends PickType(Room, ['password']) {}
