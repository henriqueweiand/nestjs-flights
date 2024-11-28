import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { JwtPayload } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(private jwtService: NestJwtService) { }

  login(user: any) {
    const { id, displayName, photos } = user;
    const payload: JwtPayload = {
      sub: id,
      displayName,
      photo: photos?.[0]?.value,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
