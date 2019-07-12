import axios, { AxiosResponse } from 'axios';
import { IHttpClient } from '../interfaces/IHttpClient';

export class HttpClientService implements IHttpClient {
    public static instance: HttpClientService;
    private constructor() {}
    public static getInstance() {
        if (!HttpClientService.instance) {
            this.instance = new HttpClientService();
        }
        return this.instance;
    }

    public async getHtml(url: string): Promise<AxiosResponse> {
        try {
            const axiosResponse: AxiosResponse = await axios.get(url);
            return axiosResponse;
        } catch (error) {
            console.log(error.message);
            // AxiosError.response is of type AxsionResponse so no need to throw. (caller doesn't need to try-catch)
            return error.response;
        }
    }
}
