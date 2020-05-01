import { Controller, Get } from '@nestjs/common';

@Controller('vote')
export class VoteController {
  constructor() {}

  @Get()
  async getAll() {
    return 'vote controller works';
  }
}
