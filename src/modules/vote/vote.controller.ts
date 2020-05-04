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

import { VoteGetAllResponseDto } from './dto/voteGetAllResponse.dto';
import { VoteCreateResponseDto } from './dto/voteCreateResponse.dto';
import { VoteCreateDto } from './dto/voteCreate.dto';
import { VoteUpdateDto } from './dto/voteUpdate.dto';
import { VoteService } from './vote.service';
import { VoteUpdateResponseDto } from './dto/voteUpdateResponse.dto';
import { VoteGetAllDto } from './dto/voteGetAll.dto';
import { VoteGetOneResponseDto } from './dto/voteGetOneResponse.dto';

@ApiTags('vote')
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get()
  @ApiResponse({
    type: VoteGetAllResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async getAll(@Query() filter: VoteGetAllDto): Promise<VoteGetAllResponseDto> {
    return await this.voteService.getAll(filter);
  }

  @Get(':id')
  @ApiResponse({
    type: VoteGetAllResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async getOne(@Param('id') id: string): Promise<VoteGetOneResponseDto> {
    return await this.voteService.getOne(id);
  }

  @Post()
  @ApiResponse({
    type: VoteCreateResponseDto,
  })
  @ApiResponse({ status: HttpStatus.CONFLICT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async create(@Body() data: VoteCreateDto): Promise<VoteCreateResponseDto> {
    return await this.voteService.create(data);
  }

  @Put(':id')
  @ApiResponse({
    type: VoteUpdateResponseDto,
  })
  @ApiResponse({ status: HttpStatus.CONFLICT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async update(@Param('id') id: string, @Body() data: VoteUpdateDto) {
    return await this.voteService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiBasicAuth()
  async delete(@Param('id') id: string) {
    return await this.voteService.delete(id);
  }
}
