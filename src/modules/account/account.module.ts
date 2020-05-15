import { Module } from '@nestjs/common';

import { AccountGateway } from './account.gateway';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [AuthModule],
  providers: [AuthService, AccountGateway],
})
export class AccountModule {}
