import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Logger, LoggerService } from '@app/logger';

import { User } from './entities/user.entity';
import { FederatedIdentity } from './entities/federated-identity.entity';

@Injectable()
export class UserService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(User)
    private readonly flightRepository: Repository<User>,
    private readonly loggerService: LoggerService,
  ) {
    this.logger = this.loggerService.getLogger(UserService.name);
  }

  async findOrCreate(user: User, federatedIdentity: FederatedIdentity): Promise<User> {
    const userExists = await this.flightRepository.findOne({
      where: { email: user.email },
      relations: ['federatedIdentity'],
    });

    if (userExists) {
      const federatedIdentityExists = userExists.federatedIdentity.find((fi) => fi.type === federatedIdentity.type);

      if (!federatedIdentityExists) {
        userExists.federatedIdentity.push(federatedIdentity);
      }

      return await this.flightRepository.save(userExists);
    }

    user.federatedIdentity = [federatedIdentity];
    return await this.flightRepository.save(user);
  }
}
