import { Inject, Injectable } from '@nestjs/common';

import { AviationStackConfig } from '../aviationstack.config';
import { AviationStackConfig as AviationStackConfigInterface, AviationStackCoutries } from "../aviationstack.interface";
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AviationStackEndpointSpec, AviationStackPaginatedResponse } from './aviationstack-requester.interfaces';

@Injectable()
export class AviationStackRequesterService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(AviationStackConfig.KEY)
        private readonly config: AviationStackConfigInterface
    ) {
        console.log('AviationStackRequesterService', this.config);
    }

    /**
   * Fetch/Send data
   */
    private async _fetch<Payload>(endpointSpec: AviationStackEndpointSpec, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<Payload>> {
        const {
            url,
            method,
        } = endpointSpec;
        console.info('endpointSpec', endpointSpec);

        const apiResponse = await this.httpService
            .axiosRef({
                url: `${url}?access_key=${this.config.apiKey}`,
                baseURL: this.config.baseUrl,
                method,
                headers: {},
                data,
                ...config,
            })
            .catch(err => {
                const responseData = err.response?.data;
                const errMessage = `Micros call to [${url}] failed with message '${responseData}'.`;

                const errorData = typeof responseData === 'object' ? JSON.stringify(responseData) : responseData;

                // throw new MicrosFetchError({ url, message: errorData, code: err.response?.status });
                throw new Error(errMessage);
            });


        // console.info('response', apiResponse);

        return apiResponse;
    }

    async getCountries(): Promise<AviationStackCoutries[]> {
        const coutries = await this._fetch<AviationStackPaginatedResponse<AviationStackCoutries[]>>({
            method: 'GET',
            url: '/countries',
        });

        return coutries.data.data;
    }
}
