import { registerEnumType } from "@nestjs/graphql";

export enum DataProviderEnum {
  AVIATION_STACK = 'AVIATION_STACK'
}

registerEnumType(DataProviderEnum, {
  name: 'DataProviderEnum',
  description: 'Data provider enum',
});