import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';

import { Room } from './room.entity';

import { AuthService } from '../auth/auth.service';
import { EnterRoomResponseDto } from './dto/response/enterRoomResponseDto';
import { AuthType } from '../auth/interfaces/types.interface';
import { CreateRoomDto } from './dto/request/createRoom.dto';
import { UpdateRoomDto } from './dto/request/updateRoom.dto';
import { EnterRoomDto } from './dto/request/enterRoom.dto';
import { GetAllRoomDto } from './dto/request/getAllRoom.dto';
import { RoomResponseDto } from './dto/response/roomResponse.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly repository: Repository<Room>,
    private readonly authService: AuthService,
  ) {}

  async getAll(
    filter: GetAllRoomDto,
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

  async create(createRoomDTO: CreateRoomDto): Promise<RoomResponseDto> {
    const { name, password } = createRoomDTO;

    const entity = this.repository.create({
      name,
      password,
    });

    return await this.repository.save(entity);
  }

  async update(id: string, roomDTO: UpdateRoomDto): Promise<RoomResponseDto> {
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
    roomEnterDto: EnterRoomDto,
    type: AuthType = AuthType.DEFAULT,
  ): Promise<EnterRoomResponseDto> {
    const { password, username } = roomEnterDto;

    const entity = await this.getOne(id);

    if (entity.password !== password) {
      // throw new BadRequestException();
    }

    return {
      token: await this.authService.login({
        roomId: entity.id,
        username,
        type,
      }),
      type,
      username,
    };
  }
}
