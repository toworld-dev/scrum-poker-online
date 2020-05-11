import { PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './createRoom.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
