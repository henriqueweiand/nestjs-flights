import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { Logger, LoggerService } from '@app/logger';

import { AviationStackConfig } from '../aviationstack.config';
import { AviationStackAirports, AviationStackConfig as AviationStackConfigInterface, AviationStackCoutries } from "../aviationstack.interface";
import { AviationStackFetchError } from './aviationstack-requester.exceptions';
import { AviationStackEndpointSpec, AviationStackPaginatedResponse } from './aviationstack-requester.interfaces';

@Injectable()
export class AviationStackRequesterService {
    private readonly logger: Logger;

    constructor(
        private readonly httpService: HttpService,
        @Inject(AviationStackConfig.KEY)
        private readonly config: AviationStackConfigInterface,
        private readonly loggerService: LoggerService,
    ) {
        this.logger = this.loggerService.getLogger(AviationStackRequesterService.name);
    }

    /**
     * Fetch/Send data
     */
    private async _fetch<Payload>(endpointSpec: AviationStackEndpointSpec, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<Payload>> {
        const {
            url,
            method,
        } = endpointSpec;
        this.logger.log('endpointSpec', endpointSpec);

        // Check if URL already has query parameters
        const hasQueryParams = url.includes('?');
        const urlWithAccessKey = `${url}${hasQueryParams ? '&' : '?'}access_key=${this.config.apiKey}`;

        const apiResponse = await this.httpService
            .axiosRef({
                url: urlWithAccessKey,
                baseURL: this.config.baseUrl,
                method,
                headers: {},
                data,
                ...config,
            })
            .catch(err => {
                const responseData = err.response?.data;
                const errorData = typeof responseData === 'object' ? JSON.stringify(responseData) : responseData;

                throw new AviationStackFetchError({ url, message: errorData, code: err.response?.status });
            });

        return apiResponse;
    }

    async getCountries(getAll: boolean = false): Promise<AviationStackCoutries[]> {
        const limit = 100; // Maximum allowed value is 100 below Professional Plan and 1000 on and above Professional Plan. Default value is 100.
        let allData: AviationStackCoutries[] = [];
        let offset = 0;
        let total = 0;

        do {
            const response = await this._fetch<AviationStackPaginatedResponse<AviationStackCoutries[]>>({
                method: 'GET',
                url: `/countries?limit=${limit}&offset=${offset}`,
            });

            allData = allData.concat(response.data.data);
            offset += limit;
            total = response.data.pagination.total;

            if (!getAll) {
                break;
            }
        } while (offset < total);

        return allData;
    }

    async getAirports(getAll: boolean = false): Promise<AviationStackAirports[]> {
        const limit = 100; // Maximum allowed value is 100 below Professional Plan and 1000 on and above Professional Plan. Default value is 100.
        let allData: AviationStackAirports[] = [];
        let offset = 0;
        let total = 0;

        do {
            const response = await this._fetch<AviationStackPaginatedResponse<AviationStackAirports[]>>({
                method: 'GET',
                url: `/airports?limit=${limit}&offset=${offset}`,
            });

            allData = allData.concat(response.data.data);
            offset += limit;
            total = response.data.pagination.total;

            if (!getAll) {
                break;
            }
        } while (offset < total);

        return allData;
    }

}
