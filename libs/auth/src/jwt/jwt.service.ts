import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { JwtPayload } from './jwt.interfaces';
import { User } from '@components/user/entities/user.entity';

@Injectable()
export class JwtService {
  constructor(private jwtService: NestJwtService) { }

  login(user: User) {
    const { id, name } = user;
    const payload: JwtPayload = {
      email: user.email,
      sub: id,
      displayName: name,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
