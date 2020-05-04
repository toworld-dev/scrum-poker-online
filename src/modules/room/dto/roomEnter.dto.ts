import { PickType } from '@nestjs/swagger';
import { Room } from '../room.entity';

export class RoomEnterDto extends PickType(Room, ['password']) {}
