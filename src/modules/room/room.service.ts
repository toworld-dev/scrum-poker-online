import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';

import { Room } from './room.entity';
import { RoomCreateDto } from './dto/roomCreate.dto';
import { RoomUpdateDto } from './dto/roomUpdate.dto';
import { RoomCreateResponseDto } from './dto/roomCreateResponse.dto';
import { RoomUpdateResponseDto } from './dto/roomUpdateResponse.dto';
import { RoomGetAllDto } from './dto/roomGetAll.dto';

import { AuthService } from '../auth/auth.service';
import { RoomEnterResponseDto } from './dto/RoomEnterResponseDto';
import { RoomEnterDto } from './dto/roomEnter.dto';
import { types } from '../auth/interface/types.interface';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly repository: Repository<Room>,
    private readonly authService: AuthService,
  ) {}

  async getAll(
    filter: RoomGetAllDto,
  ): Promise<{ data: Room[]; count: number }> {
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

  async getOne(id: string): Promise<Room> {
    try {
      return await this.repository.findOneOrFail(id);
    } catch (err) {
      // throw new NotFoundException(err);
    }
  }

  async create(createRoomDTO: RoomCreateDto): Promise<RoomCreateResponseDto> {
    const { name, password } = createRoomDTO;

    const entity = this.repository.create({
      name,
      password,
    });

    return await this.repository.save(entity);
  }

  async update(
    id: string,
    roomDTO: RoomUpdateDto,
  ): Promise<RoomUpdateResponseDto> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      // throw new NotFoundException();
    }

    try {
      const entityUpdate = this.repository.merge(entity, roomDTO);

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

  async enter(
    id: string,
    roomEnterDto: RoomEnterDto,
  ): Promise<RoomEnterResponseDto> {
    const { password } = roomEnterDto;

    const entity = await this.getOne(id);

    if (entity.password !== password) {
      // throw new BadRequestException();
    }

    return {
      token: await this.authService.login(entity.id),
      type: types.default,
    };
  }
}
