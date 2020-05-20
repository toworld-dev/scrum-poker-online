import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtPayload } from './interfaces/token.interface';
import { Socket } from 'socket.io';
import { AuthType } from './interfaces/types.interface';

@Injectable()
export class AuthService {
  async validateToken(payload: JwtPayload): Promise<boolean> {
    return !!payload.roomId;
  }

  async login({
    roomId,
    username,
    type,
    clientId,
  }: {
    roomId: string;
    username: string;
    type: AuthType;
    clientId: string;
  }): Promise<string> {
    const payload: JwtPayload = { roomId, username, type, clientId };

    return jwt.sign(payload, process.env.JWT_SECRET || 'tests');
  }

  decode(token: string): JwtPayload {
    return jwt.decode(token, {
      json: true,
    } as jwt.DecodeOptions) as JwtPayload;
  }

  getTokenFromSocket(socket: Socket): string {
    try {
      return socket.handshake.query.token;
    } catch (e) {
      throw new Error(e);
    }
  }
}
