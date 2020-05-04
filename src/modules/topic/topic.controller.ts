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

import { TopicGetAllResponseDto } from './dto/topicGetAllResponse.dto';
import { TopicCreateResponseDto } from './dto/topicCreateResponse.dto';
import { TopicCreateDto } from './dto/topicCreate.dto';
import { TopicUpdateDto } from './dto/topicUpdate.dto';
import { TopicService } from './topic.service';
import { TopicUpdateResponseDto } from './dto/topicUpdateResponse.dto';
import { TopicGetAllDto } from './dto/topicGetAll.dto';
import { TopicGetOneResponseDto } from './dto/topicGetOneResponse.dto';

@ApiTags('topic')
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  @ApiResponse({
    type: TopicGetAllResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async getAll(
    @Query() filter: TopicGetAllDto,
  ): Promise<TopicGetAllResponseDto> {
    return await this.topicService.getAll(filter);
  }

  @Get(':id')
  @ApiResponse({
    type: TopicGetAllResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async getOne(@Param('id') id: string): Promise<TopicGetOneResponseDto> {
    return await this.topicService.getOne(id);
  }

  @Post()
  @ApiResponse({
    type: TopicCreateResponseDto,
  })
  @ApiResponse({ status: HttpStatus.CONFLICT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async create(@Body() data: TopicCreateDto): Promise<TopicCreateResponseDto> {
    return await this.topicService.create(data);
  }

  @Put(':id')
  @ApiResponse({
    type: TopicUpdateResponseDto,
  })
  @ApiResponse({ status: HttpStatus.CONFLICT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async update(@Param('id') id: string, @Body() data: TopicUpdateDto) {
    return await this.topicService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async delete(@Param('id') id: string) {
    return await this.topicService.delete(id);
  }
}
