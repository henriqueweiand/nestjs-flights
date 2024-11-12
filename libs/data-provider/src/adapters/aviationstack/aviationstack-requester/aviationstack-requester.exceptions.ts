import { DataProviderEnum } from "@app/data-provider/enums/data-provider.enum";

export class AviationStackFetchError extends Error {
  readonly provider = DataProviderEnum.AVIATION_STACK;
  readonly exceptionCode = 1;

  constructor(public readonly details: { code?: string, url?: string; message?: string }) {
    super(`${DataProviderEnum.AVIATION_STACK} call to [${details?.url}], code [${details?.code}] failed with message '${details?.message}'.`);
    this.name = AviationStackFetchError.name;
  }
}
