import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { JWT_KEY } from './jwt.constants';

@Injectable()
export class JwtGuard extends AuthGuard(JWT_KEY) {
    constructor() {
        super();
    }

    getRequest(context: ExecutionContext) {
        return GqlExecutionContext.create(context).getContext().req;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (await super.canActivate(context)) {
            const user: any = this.getRequest(context).user;
            console.log('JwtGuard#canActivate() user:', user);
            return true;
        }

        return false;
    }
}
