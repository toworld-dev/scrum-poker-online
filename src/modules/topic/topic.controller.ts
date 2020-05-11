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

import { GetAllTopicResponseDto } from './dto/response/getAllTopicResponse.dto';
import { CreateTopicResponseDto } from './dto/response/createTopicResponse.dto';
import { CreateTopicDto } from './dto/request/createTopic.dto';
import { TopicUpdateDto } from './dto/request/updateTopic.dto';
import { TopicService } from './topic.service';
import { UpdateTopicResponseDto } from './dto/response/updateTopicResponse.dto';
import { GetAllTopicDto } from './dto/request/getAllTopic.dto';
import { GetOneTopicResponseDto } from './dto/response/getOneTopicResponse.dto';

@ApiTags('topic')
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  @ApiResponse({
    type: GetAllTopicResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() filter: GetAllTopicDto,
  ): Promise<GetAllTopicResponseDto> {
    return await this.topicService.getAll(filter);
  }

  @Get(':id')
  @ApiResponse({
    type: GetOneTopicResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<GetOneTopicResponseDto> {
    return await this.topicService.getOne(id);
  }

  @Post()
  @ApiResponse({
    type: CreateTopicResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateTopicDto): Promise<CreateTopicResponseDto> {
    return await this.topicService.create(data);
  }

  @Put(':id')
  @ApiResponse({
    type: UpdateTopicResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() data: TopicUpdateDto) {
    return await this.topicService.update(id, data);
  }

  @Delete(':id')
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.topicService.delete(id);
  }
}
