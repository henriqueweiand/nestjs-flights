import { Module } from '@nestjs/common';

import { GithubOauthController } from './github-oauth.controller';
import { GithubOauthStrategy } from './github-oauth.strategy';
import { EnvModule } from '@libs/env';

import { JwtModule } from '@app/auth/jwt/jwt.module';

@Module({
	imports: [
		JwtModule,
		EnvModule.register(),
	],
	controllers: [GithubOauthController],
	providers: [GithubOauthStrategy],
})
export class GithubOauthModule { }
