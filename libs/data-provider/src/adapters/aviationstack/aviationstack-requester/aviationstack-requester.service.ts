import { Inject, Injectable } from '@nestjs/common';

import { AviationStackConfig } from '../aviationstack.config';
import { AviationStackConfig as AviationStackConfigInterface, AviationStackCoutries } from "../aviationstack.interface";
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AviationStackEndpointSpec, AviationStackPaginatedResponse } from './aviationstack-requester.interfaces';
import { AviationStackFetchError } from './aviationstack-requester.exceptions';

@Injectable()
export class AviationStackRequesterService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(AviationStackConfig.KEY)
        private readonly config: AviationStackConfigInterface
    ) { }

    /**
     * Fetch/Send data
     */
    private async _fetch<Payload>(endpointSpec: AviationStackEndpointSpec, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<Payload>> {
        const {
            url,
            method,
        } = endpointSpec;
        console.info('endpointSpec', endpointSpec);

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
        let allCountries: AviationStackCoutries[] = [];
        let offset = 0;
        let total = 0;

        do {
            const response = await this._fetch<AviationStackPaginatedResponse<AviationStackCoutries[]>>({
                method: 'GET',
                url: `/countries?limit=${limit}&offset=${offset}`,
            });

            allCountries = allCountries.concat(response.data.data);
            offset += limit;
            total = response.data.pagination.total;

            if (!getAll) {
                break;
            }
        } while (offset < total);

        return allCountries;
    }

}
