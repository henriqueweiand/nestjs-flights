import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from './jwt.interfaces';
import { JWT_KEY } from './jwt.constants';

const jwtExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_KEY) {
	constructor(private configService: ConfigService) {
		super({
			jwtFromRequest: jwtExtractor,
			ignoreExpiration: false,
			passReqToCallback: true,
			secretOrKey: configService.get<string>('AUTH_JWT_SECRET'),
		});
	}

	async validate(payload: JwtPayload) {
		// For the jwt-strategy, Passport first verifies the JWT's signature and decodes the JSON.
		// It then invokes our validate() method passing the decoded JSON as its single parameter.
		// Based on the way JWT signing works, we're guaranteed that we're receiving a valid token
		// that we have previously signed and issued to a valid user.
		// `payload` is that what JwtAuthService#login() has created and what thereafter
		// GithubOauthController#githubAuthCallback() has saved as cookie named "jwt".

		// Passport assigns the value we return from this method to the Request object as `req.user`.
		// AppController#getProfile() uses this as an example.
		const { displayName, email } = payload;
		return { displayName, email };
	}
}
