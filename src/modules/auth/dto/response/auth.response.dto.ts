import { AuthType } from '../../interfaces/types.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ description: 'token of access', nullable: false })
  token: string;

  @ApiProperty({
    enum: AuthType,
    description: 'types of access',
    default: AuthType.DEFAULT,
    nullable: false,
  })
  type: AuthType;
}
