import { DataProviderAdapter } from '@app/data-provider/data-provider.adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AviationStackModuleAdapter extends DataProviderAdapter {
  getCoutries(): string[] {
    return ['US', 'CA', 'MX'];
  }
}
