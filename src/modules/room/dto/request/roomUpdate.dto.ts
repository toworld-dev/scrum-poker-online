import { PartialType } from '@nestjs/swagger';
import { RoomCreateRequestDto } from './roomCreate.dto';

export class RoomUpdateRequestDto extends PartialType(RoomCreateRequestDto) {}
