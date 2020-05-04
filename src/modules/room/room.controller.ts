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
} from '@nestjs/common';
import { ApiResponse, ApiBasicAuth, ApiTags } from '@nestjs/swagger';

import { RoomGetAllResponseDto } from './dto/roomGetAllResponse.dto';
import { RoomCreateResponseDto } from './dto/roomCreateResponse.dto';
import { RoomCreateDto } from './dto/roomCreate.dto';
import { RoomUpdateDto } from './dto/roomUpdate.dto';
import { RoomService } from './room.service';
import { RoomUpdateResponseDto } from './dto/roomUpdateResponse.dto';
import { RoomGetAllDto } from './dto/roomGetAll.dto';
import { RoomGetOneResponseDto } from './dto/roomGetOneResponse.dto';
import { RoomEnterDto } from './dto/roomEnter.dto';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @ApiResponse({
    type: RoomGetAllResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async getAll(@Query() filter: RoomGetAllDto): Promise<RoomGetAllResponseDto> {
    return await this.roomService.getAll(filter);
  }

  @Get(':id')
  @ApiResponse({
    type: RoomGetAllResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async getOne(@Param('id') id: string): Promise<RoomGetOneResponseDto> {
    return await this.roomService.getOne(id);
  }

  @Post()
  @ApiResponse({
    type: RoomCreateResponseDto,
  })
  @ApiResponse({ status: HttpStatus.CONFLICT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async create(@Body() data: RoomCreateDto): Promise<RoomCreateResponseDto> {
    return await this.roomService.create(data);
  }

  @Put(':id')
  @ApiResponse({
    type: RoomUpdateResponseDto,
  })
  @ApiResponse({ status: HttpStatus.CONFLICT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async update(@Param('id') id: string, @Body() data: RoomUpdateDto) {
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
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async enter(@Param('id') id: string, @Body() data: RoomEnterDto) {
    return await this.roomService.enter(id, data);
  }
}
