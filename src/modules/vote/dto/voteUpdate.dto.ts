import { PartialType } from '@nestjs/swagger';
import { VoteCreateDto } from './voteCreate.dto';

export class VoteUpdateDto extends PartialType(VoteCreateDto) {}
