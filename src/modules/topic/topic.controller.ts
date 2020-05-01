import { Controller, Get } from '@nestjs/common';

@Controller('topic')
export class TopicController {
  constructor() {}

  @Get()
  async getAll() {
    return 'topic controller works';
  }
}
