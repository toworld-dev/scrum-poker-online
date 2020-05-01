import { Controller, Get } from '@nestjs/common';

@Controller('topic')
export class TopicController {
  constructor() {}

  @Get()
  async find() {
    return 'topic controller works';
  }
}
