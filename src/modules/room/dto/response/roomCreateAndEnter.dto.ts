import { IntersectionType } from '@nestjs/swagger';
import { RoomResponseDto } from './room.dto';
import { RoomEnterResponseDto } from './roomEnterResponseDto';

export class RoomCreateAndEnter extends IntersectionType(
  RoomResponseDto,
  RoomEnterResponseDto,
) {}
