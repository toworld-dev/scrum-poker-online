import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';

import { Topic } from './topic.entity';
import { CreateTopicDto } from './dto/request/createTopic.dto';
import { TopicUpdateDto } from './dto/request/updateTopic.dto';
import { CreateTopicResponseDto } from './dto/response/createTopicResponse.dto';
import { UpdateTopicResponseDto } from './dto/response/updateTopicResponse.dto';
import { GetAllTopicDto } from './dto/request/getAllTopic.dto';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly repository: Repository<Topic>,
  ) {}

  async getAll(
    filter: GetAllTopicDto,
  ): Promise<{ data: Topic[]; count: number }> {
    const criteria = {
      take: filter.take,
      skip: filter.skip,
    } as any;

    if (filter.search) {
      criteria.where = {
        description: Raw(a => `${a} ILIKE '%${filter.search}%'`),
      };
    }

    const [data, count] = await this.repository.findAndCount({});
    return { data, count };
  }

  async getOne(id: string): Promise<Topic> {
    try {
      return await this.repository.findOneOrFail(id);
    } catch (err) {}
  }

  async create(
    createTopicDTO: CreateTopicDto,
  ): Promise<CreateTopicResponseDto> {
    const { description, room } = createTopicDTO;

    const entity = this.repository.create({
      description,
      room,
    });

    return await this.repository.save(entity);
  }

  async update(
    id: string,
    topicDTO: TopicUpdateDto,
  ): Promise<UpdateTopicResponseDto> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      // throw new NotFoundException();
    }

    try {
      const entityUpdate = this.repository.merge(entity, topicDTO);

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
