import { PartialType } from '@nestjs/swagger';
import { CreateVoteDto } from './createVote.dto';

export class UpdateVoteDto extends PartialType(CreateVoteDto) {}
