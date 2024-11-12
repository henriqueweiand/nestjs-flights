import { registerAs } from "@nestjs/config";

import { AviationStackConfig as AviationStackConfigInterface } from "./aviationstack.interface";

export const AviationStackConfig = registerAs('aviationstackConfig', (): AviationStackConfigInterface => {
    return {
        apiKey: process.env.AVIATIONSTACK_API_KEY,
        baseUrl: process.env.AVIATIONSTACK_BASE_URL,
    }
});