import {
  Controller,
  Get,
  Body,
  HttpStatus,
  Put,
  Param,
  Delete,
  Post,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ApiResponse, ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { GetAllRoomDto } from './dto/request/getAllRoom.dto';
import { EnterRoomResponseDto } from './dto/response/enterRoomResponseDto';
import { BaseController } from '../common/controllers/base.controller';
import { GetAllRoomResponseDto } from './dto/response/getAllRoomResponse.dto';
import { CreateRoomDto } from './dto/request/createRoom.dto';
import { UpdateRoomDto } from './dto/request/updateRoom.dto';
import { EnterRoomDto } from './dto/request/enterRoom.dto';
import { RoomResponseDto } from './dto/response/roomResponse.dto';
import { RoomService } from './room.service';

@ApiTags('room')
@Controller('room')
export class RoomController extends BaseController {
  constructor(private readonly roomService: RoomService) {
    super();
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista todas as salas',
    type: GetAllRoomResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() filter: GetAllRoomDto): Promise<GetAllRoomResponseDto> {
    return await this.roomService.getAll(filter);
  }

  @Get(':id')
  @ApiResponse({
    type: RoomResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<RoomResponseDto> {
    return await this.roomService.getOne(id);
  }

  @Post()
  @ApiResponse({
    type: RoomResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateRoomDto): Promise<RoomResponseDto> {
    return await this.roomService.create(data);
  }

  @Put(':id')
  @ApiResponse({
    type: RoomResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() data: UpdateRoomDto,
  ): Promise<RoomResponseDto> {
    return await this.roomService.update(id, data);
  }

  @Delete(':id')
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.roomService.delete(id);
  }

  @Post('enter/:id')
  @ApiResponse({ status: HttpStatus.OK, type: EnterRoomResponseDto })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async enter(@Param('id') id: string, @Body() data: EnterRoomDto) {
    return await this.roomService.enter(id, data);
  }
}
