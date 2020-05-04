import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';

import { Vote } from './vote.entity';
import { VoteCreateDto } from './dto/voteCreate.dto';
import { VoteUpdateDto } from './dto/voteUpdate.dto';
import { VoteCreateResponseDto } from './dto/voteCreateResponse.dto';
import { VoteUpdateResponseDto } from './dto/voteUpdateResponse.dto';
import { VoteGetAllDto } from './dto/voteGetAll.dto';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private readonly repository: Repository<Vote>,
  ) {}

  async getAll(
    filter: VoteGetAllDto,
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

  async create(voteCreateDto: VoteCreateDto): Promise<VoteCreateResponseDto> {
    const { vote, name, topic } = voteCreateDto;

    const entity = this.repository.create({
      vote,
      name,
      topic,
    });

    return await this.repository.save(entity);
  }

  async update(
    id: string,
    voteDTO: VoteUpdateDto,
  ): Promise<VoteUpdateResponseDto> {
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
}
