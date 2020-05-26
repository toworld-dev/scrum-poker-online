import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';

import { Topic } from './topic.entity';
import { CreateTopicDto } from './dto/request/createTopic.dto';
import { TopicUpdateDto } from './dto/request/updateTopic.dto';
import { CreateTopicResponseDto } from './dto/response/createTopicResponse.dto';
import { UpdateTopicResponseDto } from './dto/response/updateTopicResponse.dto';
import { GetAllTopicDto } from './dto/request/getAllTopic.dto';
import { Vote } from '../vote/vote.entity';
import { MappedException } from 'nestjs-mapped-exception';
import { TopicException } from './topic.exception';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly repository: Repository<Topic>,
    private readonly exception: MappedException<TopicException>,
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
    } catch (err) {
      this.exception.ERRORS.NOT_FOUND.throw();
    }
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
      this.exception.ERRORS.NOT_FOUND.throw();
    }

    try {
      const entityUpdate = this.repository.merge(entity, topicDTO);

      return await this.repository.save(entityUpdate);
    } catch (err) {
      this.exception.ERRORS.SAVE_ERROR.throw();
    }
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      this.exception.ERRORS.NOT_FOUND.throw();
    }

    try {
      await this.repository.delete(entity);
    } catch (err) {
      this.exception.ERRORS.DELETE_ERROR.throw();
    }
  }

  async votes(roomId: string) {
    const result = await this.repository
      .createQueryBuilder('topic')
      .leftJoinAndSelect('topic.votes', 'votes')
      .where('topic.room = :roomId', { roomId })
      .orderBy('topic.createdAt', 'DESC')
      .getOne();

    const votes = {};

    if (result && result?.votes) {
      result.votes.forEach(function(vote: Vote) {
        !votes[vote.vote] && (votes[vote.vote] = []);

        votes[vote.vote].push({
          username: vote.name,
          clientId: vote.clientId,
        });
      });
    }

    return votes;
  }

  async latestTopic(roomId: string): Promise<Topic> {
    return await this.repository.findOne({
      order: { createdAt: 'DESC' },
      where: {
        room: roomId,
      },
    });
  }

  async mostVotedOfTopic(topicId: string) {
    const result = await this.repository
      .createQueryBuilder('topic')
      .innerJoin('topic.votes', 'votes')
      .select('COUNT(*) as total')
      .addSelect('votes.vote as vote')
      .where('topic.id = :topicId', { topicId })
      .groupBy('vote')
      .orderBy('total', 'DESC')
      .getRawMany();

    return result;
  }
}
