import { registerEnumType } from "@nestjs/graphql";

export enum SocialProviderEnum {
    GITHUB = 'GITHUB',
    GOOGLE = 'GOOGLE',
}

registerEnumType(SocialProviderEnum, {
    name: 'SocialProviderEnum',
    description: 'social provider enum',
});