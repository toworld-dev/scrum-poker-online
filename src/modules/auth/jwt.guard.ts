import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class GraphQLAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }
}
