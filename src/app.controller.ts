import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('main')
@Controller('')
export class AppController {
  @Get()
  index() {
    return 'Scrum poker online 🚀';
  }
}
