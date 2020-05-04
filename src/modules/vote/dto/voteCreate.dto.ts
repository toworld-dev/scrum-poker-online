import { OmitType } from '@nestjs/swagger';
import { Vote } from '../vote.entity';

export class VoteCreateDto extends OmitType(Vote, ['id']) {}
