import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtPayload } from './interface/token.interface';

@Injectable()
export class AuthService {
  async validateToken(payload: JwtPayload): Promise<boolean> {
    return !!payload.roomId;
  }

  async login(roomId: string): Promise<string> {
    const payload: JwtPayload = { roomId };

    return jwt.sign(payload, process.env.JWT_SECRET);
  }
}
