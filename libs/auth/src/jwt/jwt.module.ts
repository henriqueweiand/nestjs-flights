import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { LoggerModule } from '@app/logger';
import { EnvModule } from '@libs/env';

import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    LoggerModule,
    PassportModule,
    EnvModule.register(),
    NestJwtModule.registerAsync({
      imports: [EnvModule.register()],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH_JWT_SECRET'),
        signOptions: { expiresIn: configService.get<number>('AUTH_JWT_EXPIRES') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy, JwtService],
  exports: [JwtService],
})
export class JwtModule { }
