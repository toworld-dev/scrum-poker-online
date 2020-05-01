import { PartialType } from '@nestjs/swagger';
import { RoomCreateDto } from './roomCreate.dto';

export class RoomUpdateDto extends PartialType(RoomCreateDto) {}
