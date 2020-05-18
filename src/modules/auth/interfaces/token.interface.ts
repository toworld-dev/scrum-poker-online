import { AuthType } from './types.interface';

export interface JwtPayload {
  roomId: string;
  username: string;
  type: AuthType;
}
