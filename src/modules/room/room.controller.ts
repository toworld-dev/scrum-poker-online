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
import { RoomGetAllRequestDto } from './dto/request/roomGetAll.dto';
import { RoomEnterResponseDto } from './dto/response/roomEnterResponseDto';
import { BaseController } from '../common/controllers/base.controller';
import { RoomGetAllResponseDto } from './dto/response/roomGetAll.dto';
import { RoomCreateRequestDto } from './dto/request/roomCreate.dto';
import { RoomUpdateRequestDto } from './dto/request/roomUpdate.dto';
import { RoomEnterRequestDto } from './dto/request/roomEnter.dto';
import { RoomResponseDto } from './dto/response/room.dto';
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
    type: RoomGetAllResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() filter: RoomGetAllRequestDto,
  ): Promise<RoomGetAllResponseDto> {
    return await this.roomService.getAll(filter);
  }

  @Get(':id')
  @ApiResponse({
    type: RoomResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async getOne(@Param('id') id: string): Promise<RoomResponseDto> {
    return await this.roomService.getOne(id);
  }

  @Post()
  @ApiResponse({
    type: RoomResponseDto,
  })
  @ApiResponse({ status: HttpStatus.CONFLICT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async create(@Body() data: RoomCreateRequestDto): Promise<RoomResponseDto> {
    return await this.roomService.create(data);
  }

  @Put(':id')
  @ApiResponse({
    type: RoomResponseDto,
  })
  @ApiResponse({ status: HttpStatus.CONFLICT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async update(
    @Param('id') id: string,
    @Body() data: RoomUpdateRequestDto,
  ): Promise<RoomResponseDto> {
    return await this.roomService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async delete(@Param('id') id: string) {
    return await this.roomService.delete(id);
  }

  @Post('enter/:id')
  @ApiResponse({ status: HttpStatus.OK, type: RoomEnterResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async enter(@Param('id') id: string, @Body() data: RoomEnterRequestDto) {
    return await this.roomService.enter(id, data);
  }
}
