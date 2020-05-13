import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtPayload } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  async validateToken(payload: JwtPayload): Promise<boolean> {
    return !!payload.roomId;
  }

  async login(roomId: string): Promise<string> {
    const payload: JwtPayload = { roomId };

    return jwt.sign(payload, process.env.JWT_SECRET || 'tests');
  }

  decode(token): null | { [key: string]: any } | string {
    return jwt.decode(token, {
      json: true,
    } as jwt.DecodeOptions);
  }
}
