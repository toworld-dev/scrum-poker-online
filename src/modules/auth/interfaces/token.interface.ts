import { AuthType } from './types.interface';

export interface JwtPayload {
  clientId: string;
  roomId: string;
  username: string;
  type: AuthType;
}
