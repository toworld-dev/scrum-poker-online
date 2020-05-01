import { Controller, Get } from '@nestjs/common';

@Controller('room')
export class RoomController {
  constructor() {}

  @Get()
  async find() {
    return 'room controller works';
  }
}
