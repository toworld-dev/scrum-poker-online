import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
