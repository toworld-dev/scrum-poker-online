import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('vote')
@Controller('vote')
export class VoteController {
  @Get()
  getAll() {
    return 'vote controller works';
  }
}
