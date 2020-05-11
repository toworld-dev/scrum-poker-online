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

import { VoteService } from './vote.service';
import { GetAllVoteResponseDto } from './dto/response/getAllVoteResponse.dto';
import { GetAllVoteDto } from './dto/request/getAllVote.dto';
import { GetOneVoteResponseDto } from './dto/response/getOneVoteResponse.dto';
import { CreateVoteResponseDto } from './dto/response/createVoteResponse.dto';
import { CreateVoteDto } from './dto/request/createVote.dto';
import { UpdateVoteResponseDto } from './dto/response/updateVoteResponse.dto';
import { UpdateVoteDto } from './dto/request/updateVote.dto';

@ApiTags('vote')
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get()
  @ApiResponse({
    type: GetAllVoteResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() filter: GetAllVoteDto): Promise<GetAllVoteResponseDto> {
    return await this.voteService.getAll(filter);
  }

  @Get(':id')
  @ApiResponse({
    type: GetOneVoteResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<GetOneVoteResponseDto> {
    return await this.voteService.getOne(id);
  }

  @Post()
  @ApiResponse({
    type: CreateVoteResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateVoteDto): Promise<CreateVoteResponseDto> {
    return await this.voteService.create(data);
  }

  @Put(':id')
  @ApiResponse({
    type: UpdateVoteResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() data: UpdateVoteDto) {
    return await this.voteService.update(id, data);
  }

  @Delete(':id')
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.voteService.delete(id);
  }
}
