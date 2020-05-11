import { IntersectionType } from '@nestjs/swagger';
import { RoomResponseDto } from './roomResponse.dto';
import { EnterRoomResponseDto } from './enterRoomResponseDto';

export class RoomCreateAndEnter extends IntersectionType(
  RoomResponseDto,
  EnterRoomResponseDto,
) {}
