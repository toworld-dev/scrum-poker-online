import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtPayload } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  async validateToken(payload: JwtPayload): Promise<boolean> {
    return !!payload.roomId;
  }

  async login({
    roomId,
    username,
  }: {
    roomId: string;
    username: string;
  }): Promise<string> {
    const payload: JwtPayload = { roomId, username };

    return jwt.sign(payload, process.env.JWT_SECRET || 'tests');
  }

  decode(token: string): JwtPayload {
    return jwt.decode(token, {
      json: true,
    } as jwt.DecodeOptions) as JwtPayload;
  }
}
