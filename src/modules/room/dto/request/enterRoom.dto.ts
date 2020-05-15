import { PickType, IntersectionType } from '@nestjs/swagger';
import { Room } from '../../room.entity';
import { AuthResponseDto } from 'src/modules/auth/dto/response/auth.response.dto';

export class EnterRoomDto extends IntersectionType(
  PickType(Room, ['password']),
  PickType(AuthResponseDto, ['username']),
) {}
