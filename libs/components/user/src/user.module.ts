import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '@app/logger';

import { FederatedIdentity } from './entities/federated-identity.entity';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([User, FederatedIdentity]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
