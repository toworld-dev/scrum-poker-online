import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('vote')
@Controller('vote')
export class VoteController {
  constructor() {}

  @Get()
  async getAll() {
    return 'vote controller works';
  }
}
