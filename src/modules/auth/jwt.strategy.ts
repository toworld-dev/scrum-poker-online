import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET || 'tests',
    });
  }

  async validate(payload: any, done: Function) {
    const valid: boolean = await this.authService.validateToken(payload);
    if (!valid) {
      return done(new UnauthorizedException(), false);
    }
    done(null, valid);
  }
}
