import { Method } from 'axios';

export interface AviationStackEndpointSpec {
  method: Method;
  url: string;
  headers?: Record<string, string>;
}

export interface AviationStackPaginatedResponse<T> {
  pagination: {
    limit: number,
    offset: number,
    count: number,
    total: number
  },
  data: T
}      