import { OmitType, IntersectionType, PickType } from '@nestjs/swagger';
import { Room } from '../../room.entity';
import { AuthResponseDto } from 'src/modules/auth/dto/response/auth.response.dto';

export class CreateRoomDto extends IntersectionType(
  OmitType(Room, ['id', 'createdAt', 'updatedAt']),
  PickType(AuthResponseDto, ['username']),
) {}
