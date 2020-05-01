import { OmitType } from '@nestjs/swagger';
import { Room } from '../room.entity';

export class RoomGetAllDto {
  take: number = 10;
  skip: number = 0;
  search?: string;
}
