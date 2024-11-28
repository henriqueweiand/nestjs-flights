import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Logger, LoggerService } from '@app/logger';

import { User } from './entities/user.entity';

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

}
