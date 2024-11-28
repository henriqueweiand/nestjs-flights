import { Module } from '@nestjs/common';

import { GithubOauthModule } from './github/github-oauth.module';

@Module({
	imports: [
		GithubOauthModule
	],
})
export class AuthModule { }
