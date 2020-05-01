import { Controller, Get } from '@nestjs/common';
import { TopicDoesntExists } from './topic.exception';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('topic')
@Controller('topic')
export class TopicController {
  @Get()
  async getAll() {
    throw new TopicDoesntExists('id');
    return 'topic controller works';
  }
}
