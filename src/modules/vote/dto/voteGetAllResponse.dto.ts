import { Vote } from '../vote.entity';

class VoteGetAllResponseDataDto extends Vote {}

export class VoteGetAllResponseDto {
  data: VoteGetAllResponseDataDto[];
  count: number;
}
