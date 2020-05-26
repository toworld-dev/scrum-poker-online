import { MappedExceptionItem } from 'nestjs-mapped-exception';
import { HttpStatus } from '@nestjs/common';

export class RoomException {
  NOT_FOUND: MappedExceptionItem = {
    message: 'Room not found',
    code: 1,
    statusCode: HttpStatus.NOT_FOUND,
  };

  SAVE_ERROR: MappedExceptionItem = {
    message: 'There was an error while saving register',
    code: 2,
    statusCode: HttpStatus.BAD_REQUEST,
  };

  DELETE_ERROR: MappedExceptionItem = {
    message: 'There was an error while deleting register',
    code: 3,
    statusCode: HttpStatus.BAD_REQUEST,
  };

  INVALID_ROOM_CREDENTIALS: MappedExceptionItem = {
    message: 'Invalid room credentials',
    code: 4,
    statusCode: HttpStatus.BAD_REQUEST,
  };
}
