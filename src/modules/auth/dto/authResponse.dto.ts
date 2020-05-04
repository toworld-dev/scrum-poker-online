import { types } from '../interface/types.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ description: 'token of access', nullable: false })
  token: string;

  @ApiProperty({
    enum: types,
    description: 'types of access',
    default: types.default,
    nullable: false,
  })
  type: types;
}
