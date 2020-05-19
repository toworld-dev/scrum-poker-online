import { OmitType } from '@nestjs/swagger';
import { Vote } from '../../vote.entity';

export class CreateVoteDto extends OmitType(Vote, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
