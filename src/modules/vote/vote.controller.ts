import { Controller, Get } from '@nestjs/common';

@Controller('vote')
export class VoteController {
  constructor() {}

  @Get()
  async find() {
    return 'vote controller works';
  }
}
