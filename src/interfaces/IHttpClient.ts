import { AxiosResponse } from 'axios';
export interface IHttpClient {
    getHtml(url: string): Promise<AxiosResponse>;
}
