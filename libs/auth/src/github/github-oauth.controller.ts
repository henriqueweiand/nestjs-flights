import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { JwtService } from '@app/auth/jwt/jwt.service';
import { User } from '@components/user/entities/user.entity';

import { GithubOauthGuard } from './github-oauth.guard';

@Controller('auth/github')
export class GithubOauthController {
	constructor(private jwtService: JwtService) { }

	@Get()
	@UseGuards(GithubOauthGuard)
	async githubAuth() {
		// With `@UseGuards(GithubOauthGuard)` we are using an AuthGuard that @nestjs/passport
		// automatically provisioned for us when we extended the passport-github strategy.
		// The Guard initiates the passport-github flow.
	}

	@Get('callback')
	@UseGuards(GithubOauthGuard)
	async githubAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		// Passport automatically creates a `user` object, based on the return value of our
		// GithubOauthStrategy#validate() method, and assigns it to the Request object as `req.user`

		const user = req.user as User;

		const { accessToken } = this.jwtService.login(user);
		return { access_token: accessToken };
	}
}
