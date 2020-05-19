import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';

import { Vote } from './vote.entity';
import { CreateVoteDto } from './dto/request/createVote.dto';
import { UpdateVoteDto } from './dto/request/updateVote.dto';
import { CreateVoteResponseDto } from './dto/response/createVoteResponse.dto';
import { UpdateVoteResponseDto } from './dto/response/updateVoteResponse.dto';
import { GetAllVoteDto } from './dto/request/getAllVote.dto';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private readonly repository: Repository<Vote>,
  ) {}

  async getAll(
    filter: GetAllVoteDto,
  ): Promise<{ data: Vote[]; count: number }> {
    const criteria = {
      take: filter.take,
      skip: filter.skip,
    } as any;

    if (filter.search) {
      criteria.where = { name: Raw(a => `${a} ILIKE '%${filter.search}%'`) };
    }

    const [data, count] = await this.repository.findAndCount({});
    return { data, count };
  }

  async getOne(id: string): Promise<Vote> {
    try {
      return await this.repository.findOneOrFail(id);
    } catch (err) {}
  }

  async create(voteCreateDto: CreateVoteDto): Promise<CreateVoteResponseDto> {
    const { vote, name, topic, clientId } = voteCreateDto;

    const entity = this.repository.create({
      vote,
      name,
      topic,
      clientId,
    });

    return await this.repository.save(entity);
  }

  async update(
    id: string,
    voteDTO: UpdateVoteDto,
  ): Promise<UpdateVoteResponseDto> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      // throw new NotFoundException();
    }

    try {
      const entityUpdate = this.repository.merge(entity, voteDTO);

      return await this.repository.save(entityUpdate);
    } catch (err) {
      // throw new BadRequestException(err);
    }
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      // throw new NotFoundException();
    }

    try {
      await this.repository.delete(entity);
    } catch (err) {
      // throw new BadRequestException(err);
    }
  }

  async vote(voteDTO: CreateVoteDto): Promise<Vote> {
    const { topic, clientId } = voteDTO;
    const vote = await this.repository.findOne({ where: { topic, clientId } });

    if (vote) {
      return this.update(vote.id, voteDTO);
    }

    return this.create(voteDTO);
  }
}
