import { Controller, Get } from '@nestjs/common';
import { TopicDoesntExists } from './topic.exception';

@Controller('topic')
export class TopicController {
  constructor() {}

  @Get()
  async getAll() {
    throw new TopicDoesntExists('id');
    return 'topic controller works';
  }
}
